import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

function Player() {

  const{id}=useParams();
  const navigate=useNavigate()

  const[apiData,setApiData]=useState({

    name:'',
    key:'',
    published_at:'',
    typeof:''
     

  })
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTgzOTk3MDdjOWRiNWVhMTA5ZWE5MjU4ZmU3YjVjMiIsIm5iZiI6MTcyOTExNTY3Mi43MDI5OTEsInN1YiI6IjY3MTAzNDRkMWY5ZDBlZTRiOGM5YWQ3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZKDfsQ5z_2wZVWwYw364tvSIWOzqddodg_T9XSu_Q6U'
    }
  };
  

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  },[])

  return (
    <div className='player'>
      {/* Back button */}
      <img src={back_arrow_icon} alt="Go back" onClick={() => {navigate(-2)}} />
      
      {/* Video Player */}
      <iframe 
        src={`https://www.youtube.com/embed/${apiData.key}`} 
        title='Trailer' 
        allowFullScreen
      ></iframe>
      
      {/* Player Information */}
      <div className="player-info-container">
    
    <p>{apiData.published_at.slice(0,10)}</p>
    <p>{apiData.name}</p>
    <p>{apiData.typeof}</p>
      </div>
    </div>
  );
}

export default Player;
