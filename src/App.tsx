import 'react-player-cc/style.css'
import ReactPlayerCC from 'react-player-cc'

function App() {
  return <ReactPlayerCC src="./video.mp4" subtitles={[{ id: 1, title: 'test', link: "./sub.srt", default: true }]} />
}

export default App;