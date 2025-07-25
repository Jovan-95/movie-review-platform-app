import { useNavigate } from "react-router-dom";

function HomeHeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <h1 className="hero__title">Welcome to Movie Review Platform</h1>
      <p className="hero__subtitle">
        Discover movies, share your thoughts, and read community insights.
      </p>
      <div className="hero__buttons">
        <button
          onClick={() => navigate("/movies")}
          className="btn btn--primary"
        >
          <span>Explore Movies</span>
        </button>
        <button
          onClick={() => navigate("/blog")}
          className="btn btn--secondary"
        >
          <span>Read Blog</span>
        </button>
      </div>
    </section>
  );
}

export default HomeHeroSection;
