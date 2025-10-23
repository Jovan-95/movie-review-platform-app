/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../services";
import type { Movie } from "../types";
import { NavLink } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { Grid } from "ldrs/react";
import { useState } from "react";
import Pagination from "../components/Pagination";

function Movies() {
  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

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

  const paginatedMovies = movies.results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="home">
      {/* <!-- Popular Movies --> */}
      <section className="section movies-preview">
        <h2 className="section__title">Popular Movies</h2>
        <div className="cards">
          {paginatedMovies.map((movie: Movie) => (
            <NavLink key={movie.id} to={`/movies/${movie.id}`}>
              <MovieCard movie={movie} />
            </NavLink>
          ))}
        </div>
      </section>
      <Pagination
        totalItems={movies.results.length}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default Movies;
