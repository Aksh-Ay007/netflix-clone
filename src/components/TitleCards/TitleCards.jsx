import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';
function TitleCards({title,category}) {

  const [apiData,setApiData]=useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTgzOTk3MDdjOWRiNWVhMTA5ZWE5MjU4ZmU3YjVjMiIsIm5iZiI6MTcyOTExNTY3Mi43MDI5OTEsInN1YiI6IjY3MTAzNDRkMWY5ZDBlZTRiOGM5YWQ3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZKDfsQ5z_2wZVWwYw364tvSIWOzqddodg_T9XSu_Q6U'
    }
  };
  


  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY; // Fixed typo: scrollLeft instead of scroolLeft
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    const currentRef = cardsRef.current;
    currentRef.addEventListener('wheel', handleWheel); // Correct 'wheel' event (case-sensitive)

    // Clean up the event listener on component unmount
    return () => {
      currentRef.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className='title-cards'>
      <h2>{title?title:'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}> {/* Corrected typo: ref instead of red */}
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TitleCards;
