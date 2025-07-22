import { useState } from 'react'
import "./MoodSongs.css";

const MoodSongs = ({ Songs }) => {
  return (
    <div className='mood-songs'>
      <h2>Recommended Songs</h2>

      {Array.isArray(Songs) && Songs.length > 0 ? (
        Songs.map((song, index) => (
          <div className='song' key={index}>
            <div className='title'>
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>
            <div className='paly-pause-button'>
              <i className="ri-pause-line"></i>
              <i className="ri-play-circle-fill"></i>
            </div>
          </div>
        ))
      ) : (
        <p>No songs available</p>
      )}
    </div>
  )
}

export default MoodSongs;
