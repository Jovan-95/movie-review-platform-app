/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { getBlogs, getPopularMovies, getReviews } from "../services";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import type { Blog, Movie, Review, User } from "../types";

function useGlobalSearch(query: string) {
  // Users are loaded from redux
  const { users, loading } = useSelector((state: RootState) => state.users);

  // Getting movies
  const { data: movies } = useQuery({
    queryKey: ["movies"],
    queryFn: getPopularMovies,
  });

  // Getting reviews from services with reactQuery
  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });

  // Getting blogs from services with reactQuery
  const { data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  if (!query) return [];

  const q = query.toLowerCase();

  const userResults = users.filter(
    (u: User) =>
      u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  );

  const movieResults = movies.results.filter((m: Movie) =>
    m.title.toLowerCase().includes(q)
  );

  const blogResults = blogs.filter(
    (b: Blog) =>
      b.title.toLowerCase().includes(q) || b.content.toLowerCase().includes(q)
  );

  const reviewResults = reviews.filter(
    (r: Review) =>
      r.content.toLowerCase().includes(q) || r.content.toLowerCase().includes(q)
  );

  return [
    ...userResults.map((u: User) => ({ type: "user", ...u })),
    ...movieResults.map((m: Movie) => ({ type: "movie", ...m })),
    ...blogResults.map((b: Blog) => ({ type: "blog", ...b })),
    ...reviewResults.map((r: Review) => ({ type: "review", ...r })),
  ];
}

export default useGlobalSearch;
