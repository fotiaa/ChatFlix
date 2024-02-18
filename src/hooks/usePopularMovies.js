import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addPopularMovies } from "../utils/moviesSlice";

export const usePopularMovies = () => {
    const dispatch = useDispatch();

    const popularMovies = useSelector(store => store.movies.popularMovies)

    const getPopularMovies = async () => {
      const data = await fetch("https://api.themoviedb.org/3/movie/popular?page=2", API_OPTIONS)
      const json = await data.json();
      dispatch(addPopularMovies(json.results));
    }
  
    useEffect(() => {
      if(!popularMovies) {
        getPopularMovies();
      }
    },[])
}

export default usePopularMovies;