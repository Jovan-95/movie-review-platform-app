/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../services";
import type { Movie } from "../types";
import { NavLink } from "react-router-dom";

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
  if (moviesIsLoading) return <p>Loading...</p>;
  if (moviesError) return <p>{moviesError?.message}</p>;
  return (
    <div className="home">
      {/* <!-- Popular Movies --> */}
      <section className="section movies-preview">
        <h2 className="section__title">Popular Movies</h2>
        <div className="cards">
          {movies.results?.map((movie: Movie) => (
            <NavLink key={movie.id} to={`/movies/${movie.id}`}>
              <div className="card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt="movie"
                  className="card__img"
                />
                <h3 className="card__title">{movie.title}</h3>
                <p>{movie.popularity}</p>
                <p className="card__meta">
                  {movie.release_date} · {movie.vote_average} ⭐
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Movies;
