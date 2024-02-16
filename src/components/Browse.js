import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import SecondaryContainer from './SecondaryContainer'
import MainContainer from './MainContainer'
import usePopularMovies from '../hooks/usePopularMovies'
import { useSelector } from 'react-redux'
import GptSearchPage from './GptSearchPage'

const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  return (
    <div>
      <Header/>
      { 
        showGptSearch ? 
        <GptSearchPage/> : 
        <>
          <MainContainer/>
          <SecondaryContainer/>
        </>
      }
    </div>
  )
}

export default Browse
