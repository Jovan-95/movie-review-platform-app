/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router-dom";
import { getPopularMovies } from "../../services";
import { useQuery } from "@tanstack/react-query";
import type { Movie } from "../../types";

function SingleMovie() {
  const { id } = useParams();

  // Getting movies
  const {
    data: movies,
    isLoading: moviesIsLoading,
    error: moviesError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getPopularMovies,
  });

  // Error handling
  if (moviesIsLoading) return <p>Loading...</p>;
  if (moviesError) return <p>{moviesError?.message}</p>;

  const singleMovie = movies.results.find(
    (movie: Movie) => Number(movie.id) === Number(id)
  );
  //   console.log("single movie :", singleMovie);

  return (
    <div className="single-movie">
      <div
        className="single-movie__backdrop"
        // background image inline stil možeš dodati u React-u koristeći singleMovie.backdrop_path
      ></div>

      <div className="single-movie__content-movie">
        <div className="single-movie__poster-wrapper">
          <img
            src={`https://image.tmdb.org/t/p/w500${singleMovie.backdrop_path}`}
            alt="movie poster"
            className="single-movie__poster"
          />
        </div>

        <div className="single-movie__info">
          <h1 className="single-movie__title">{singleMovie.title}</h1>

          <p className="single-movie__meta">
            <span className="single-movie__year">
              Release Date: {singleMovie.release_date}
            </span>
            <span className="single-movie__genre">
              Popularity: {singleMovie.popularity}
            </span>
          </p>

          <p className="single-movie__rating">
            ⭐ {singleMovie.vote_average} / 10
          </p>

          <p className="single-movie__description">{singleMovie.overview}</p>

          <button className="single-movie__btn">Add to Favorites</button>
        </div>
      </div>
    </div>
  );
}

export default SingleMovie;
