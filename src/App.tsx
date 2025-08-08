import 'react-player-cc/style.css'
import ReactPlayerCC, { type PlayerInterface } from 'react-player-cc'
import './index.css'

import Hls from "hls.js";

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

function App() {
  return <>
    <h1>MP4 Example</h1>
    <ReactPlayerCC src="./video.mp4" subtitles={[{ id: 1, title: 'test', link: "./sub.srt", default: true }]} />

    <h1>HLS Example</h1>
    <ReactPlayerCC playerClass={HlsVideoPlayer} src="./hls.m3u8" subtitles={[{ id: 1, title: 'test', link: "./sub.srt", default: true }]} />
  </>
}

export default App;