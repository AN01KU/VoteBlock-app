import "../css/registration_from.css";
import img from "../assets/img/ev.png";
import { useRef, useState } from "react";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";
import { Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      localStorage.setItem("currentUserEmail", emailRef.current.value)
      navigate('/home');
    } catch {
      setError("Failed to sign in");
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          {error && <Alert variant="danger">{error}</Alert>}  
          <form onSubmit={handleSubmit}>
            <h2 className="title">Sign in</h2>
            <FormInput
              type="text"
              placeholder="Email Address"
              name="email_address"
              refer={emailRef}
            />
            <FormInput 
              type="password" 
              placeholder="Password" 
              name="password" 
              refer={passwordRef}
            />

            <input 
              type="submit" 
              value="Login" 
              className="btn solid"
              disabled={loading}
              />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>If you haven't signed up , What are you waiting for ?</p>
            <Link to="/register">
              <button className="btn transparent" id="sign-up-btn">
                Sign up
              </button>
            </Link>
          </div>
          <img src={img} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
