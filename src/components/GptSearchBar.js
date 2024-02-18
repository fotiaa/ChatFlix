import React, { useRef } from 'react'
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
    const langKey = useSelector(store => store.config.lang)
    const dispatch = useDispatch();
    const searchText = useRef(null);

    const searchMovieTMDB = async(movie) => {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      )
      
      const json = await data.json();
      return json.results;
    }

    const handleGptSearchClick = async () => {
      /// Make an  API call to GPT API and get Movie results

      const gptQuery = "Act as movie recommendation system and suggest some movies for the query" + searchText.current.value + ". only give names of 5 movies, comma separated like the example result given ahead. Example result: Gadar, Sholey, Don, Golmaal, Dangal";

      const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });

      if(!gptResults.choices){
        /// Navigate to error page
      }

      /// This will give array of movies having 5 strings
      const gptMovies = gptResults.choices?.[0]?.message?.content.split(",")
      /// For each movie i will search TMDB API
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      /// searchMovieTMDB func will return five promise so we have to resolve them
      const tmdbResults = await Promise.all(promiseArray);
      dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}));
    }

  return (
    <div className="pt-[40%] md:pt-[10%] flex justify-center">
      <form className="w-full bg-black md:w-1/2 grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
        <input 
            type="text" 
            className="p-4 m-4 col-span-9 rounded-lg" 
            placeholder={lang[langKey].gptSearchPlaceholder}
            ref = {searchText}
        />
        <button className="py-2 px-2 m-4 bg-red-700 text-white col-span-3 rounded-lg" 
         onClick={handleGptSearchClick}
        >
            {lang[langKey].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar;
