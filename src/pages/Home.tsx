/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import HomeHeroSection from "../components/HomeHeroSection";
import HomeMovies from "../components/HomeMovies";
import HomeReviews from "../components/HomeReviews";
import HomeBlogs from "../components/HomeBlogs";
import HomeCTA from "../components/HomeCTA";

function Home() {
  // Get logged user from Redux
  const user = useSelector((state: RootState) => state.auth.loggedInUser);

  return (
    <div className="home">
      {/* <!-- Hero Section --> */}
      <HomeHeroSection />

      {/* <!-- Popular Movies --> */}
      <HomeMovies />

      {/* <!-- Top Reviews --> */}
      <HomeReviews />

      {/* <!-- Latest Blogs --> */}
      <HomeBlogs />
      {/* <!-- Call to Action --> */}
      {user ? "" : <HomeCTA />}
    </div>
  );
}

export default Home;
