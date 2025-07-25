import { useNavigate } from "react-router-dom";

function HomeCTA() {
  const navigate = useNavigate();
  return (
    <section className="cta">
      <h2 className="cta__title">Ready to join the community?</h2>
      <button onClick={() => navigate("/register")} className="btn ">
        <span>Create an Account</span>
      </button>
    </section>
  );
}

export default HomeCTA;
