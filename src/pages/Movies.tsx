/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../services";
import type { Movie } from "../types";
import { NavLink } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { Grid } from "ldrs/react";

function Movies() {
  // Getting movies
  const {
    data: movies,
    isLoading: moviesIsLoading,
    error: moviesError,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: getPopularMovies,
  });

  // Error handling
  if (moviesIsLoading)
    return (
      <div className="loading-wrapper">
        <Grid size="100" speed="1" color="#2a5298 " />
      </div>
    );
  if (moviesError) return <p>{moviesError?.message}</p>;
  return (
    <div className="home">
      {/* <!-- Popular Movies --> */}
      <section className="section movies-preview">
        <h2 className="section__title">Popular Movies</h2>
        <div className="cards">
          {movies.results?.map((movie: Movie) => (
            <NavLink key={movie.id} to={`/movies/${movie.id}`}>
              <MovieCard movie={movie} />
            </NavLink>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Movies;
