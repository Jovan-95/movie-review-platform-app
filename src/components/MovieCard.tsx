import type { Movie } from "../types";

function MovieCard({ movie }: { movie: Movie }) {
  return (
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
  );
}

export default MovieCard;
