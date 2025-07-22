import { useState } from 'react'
import FacialExpression from "./components/FacialExpression";
import './App.css'
import MoodSongs from './components/MoodSongs';

function App() {
   const [Songs, setSongs] = useState([
    {
      title: "test_title",
      artist: "test_artist",
      url: "test_url",
    },
    {
      title: "test_title",
      artist: "test_artist",
      url: "test_url",
    },
    {
      title: "test_title",
      artist: "test_artist",
      url: "test_url",
    },
  ])
  return (
    <>
      <FacialExpression setSongs={setSongs} />
      <MoodSongs songs={Songs} />
    </>
  )
}

export default App
