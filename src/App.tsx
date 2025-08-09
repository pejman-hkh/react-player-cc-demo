import 'react-player-cc/style.css'
import ReactPlayerCC, { type PlayerInterface } from 'react-player-cc'
import './index.css'

import Hls from "hls.js";
import * as dashjs from 'dashjs';
import CodeHighlighter from './CodeHighlighter';
import { FaGithub } from 'react-icons/fa';

export class HlsVideoPlayer implements PlayerInterface {
  private hls: Hls;
  private video: HTMLVideoElement;

  constructor(video: HTMLVideoElement) {
    this.video = video;
    this.hls = new Hls();
    this.hls.attachMedia(video);
  }

  load(src: string) {
    if (Hls.isSupported()) {
      this.hls.loadSource(src);
    } else if (this.video.canPlayType("application/vnd.apple.mpegurl")) {
      this.video.src = src;
    }
  }

  play() {
    this.video.play();
  }

  pause() {
    this.video.pause();
  }

  destroy() {
    this.hls.destroy();
  }
}

export class DashVideoPlayer implements PlayerInterface {
  private dash: dashjs.MediaPlayerClass;
  private video: HTMLVideoElement;

  constructor(video: HTMLVideoElement) {
    this.video = video;
    this.dash = dashjs.MediaPlayer().create();
    this.dash.initialize(video, "", false);
  }

  load(src: string) {
    this.dash.attachSource(src);
  }

  play() {
    this.video.play();
  }

  pause() {
    this.video.pause();
  }

  destroy() {
    this.dash.reset();
  }
}

function App() {
  return <>

    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-2">

      <h1 className="text-3xl font-bold flex items-center"> <img src="logo.svg" width={100} /> React Player CC Demo</h1>

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl md:p-6 p-3">
        <a
          href="https://github.com/pejman-hkh/react-player-cc"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Repository"
          className="text-black text-4xl"
        >
          <FaGithub />
        </a>

        <h2 className="text-2xl font-bold mt-8">Installation</h2>
        <CodeHighlighter language='bash' code={`npm install react-player-cc`} />
        <p>
          By default, this package uses the native video element for playback.
          However, you can pass a class that implements the PlayerInterface to use any custom player you want — such as HLS, DASH, WebRTC, and more.
        </p>
        <h2 className="text-2xl font-bold mt-8">MP4 Example</h2>

        <ReactPlayerCC src="./video.mp4" subtitles={[{ id: 1, title: 'test', link: "./sub.srt", default: true }]} />

        <h2 className="text-2xl font-bold mt-8">HLS Example</h2>
        <ReactPlayerCC playerClass={HlsVideoPlayer} src="./hls.m3u8" subtitles={[{ id: 1, title: 'test', link: "./sub.srt", default: true }]} />

        <h2 className="text-2xl font-bold mt-8">DASH Example</h2>
        <ReactPlayerCC playerClass={DashVideoPlayer} src="https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd" subtitles={[{ id: 1, title: 'test', link: "./sub.srt", default: true }]} />

        <h2 className="text-2xl font-bold mt-8">Usage Example</h2>
        <CodeHighlighter language="tsx" code={`
import 'react-player-cc/style.css'
import ReactPlayerCC, { type PlayerInterface } from 'react-player-cc'
import './index.css'

import Hls from "hls.js";
import * as dashjs from 'dashjs';
import CodeHighlighter from './CodeHighlighter';

export class HlsVideoPlayer implements PlayerInterface {
  private hls: Hls;
  private video: HTMLVideoElement;

  constructor(video: HTMLVideoElement) {
    this.video = video;
    this.hls = new Hls();
    this.hls.attachMedia(video);
  }

  load(src: string) {
    if (Hls.isSupported()) {
      this.hls.loadSource(src);
    } else if (this.video.canPlayType("application/vnd.apple.mpegurl")) {
      this.video.src = src;
    }
  }

  play() {
    this.video.play();
  }

  pause() {
    this.video.pause();
  }

  destroy() {
    this.hls.destroy();
  }
}

export class DashVideoPlayer implements PlayerInterface {
  private dash: dashjs.MediaPlayerClass;
  private video: HTMLVideoElement;

  constructor(video: HTMLVideoElement) {
    this.video = video;
    this.dash = dashjs.MediaPlayer().create();
    this.dash.initialize(video, "", false);
  }

  load(src: string) {
    this.dash.attachSource(src);
  }

  play() {
    this.video.play();
  }

  pause() {
    this.video.pause();
  }

  destroy() {
    this.dash.reset();
  }
}

function App() {
  return <>

    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-2">
      <h1 className="text-3xl font-bold flex items-center"> <img src="logo.svg" width={100} /> React Player CC Demo</h1>
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-3">

        <h2 className="text-2xl font-bold mt-8">MP4 Example</h2>

        <ReactPlayerCC src="./video.mp4" subtitles={[{ id: 1, title: 'test', link: "./sub.srt", default: true }]} />

        <h2 className="text-2xl font-bold mt-8">HLS Example</h2>
        <ReactPlayerCC playerClass={HlsVideoPlayer} src="./hls.m3u8" subtitles={[{ id: 1, title: 'test', link: "./sub.srt", default: true }]} />

        <h2 className="text-2xl font-bold mt-8">DASH Example</h2>
        <ReactPlayerCC playerClass={DashVideoPlayer} src="https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd" subtitles={[{ id: 1, title: 'test', link: "./sub.srt", default: true }]} />

      </div>
    </div>

  </>
}
export default App;
  `} />
      </div>
    </div>

  </>
}

export default App;