import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggestions = () => {
    const gptStore = useSelector(store => store.gpt);
    const { movieNames, movieResults } = gptStore;

    if(!movieNames) {
        /// Show something here
        return null;
    }

  return (
    <div className = "p-4 m-4 bg-black text-white bg-opacity-70">
      <div>
        { movieNames.map( (movieName, index) => (
          <MovieList 
            key={movieName} 
            title={movieName} 
            movies = {movieResults[index]}/>
        ))}
      </div>
    </div>
  )
}

export default GptMovieSuggestions;
