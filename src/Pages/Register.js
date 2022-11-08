import img from "../assets/img/home_page.png";
import { useRef, useState } from "react";
import FormInput from "../components/FormInput";
import { useAuth } from "../context/AuthContext";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/registration_from.css";


const Register = () => {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <h2 className="title">Sign up</h2>
            <FormInput
              type="text"
              placeholder="Name"
              name="first_name"
              refer={nameRef}
            />
            <FormInput
              type="email"
              placeholder="Email"
              name="email_address"
              refer={emailRef}
            />
            <FormInput
              type="password"
              placeholder="Password"
              name="password"
              refer={passwordRef}
            />
            <FormInput
              type="password"
              placeholder="ConfirmPassword"
              name="confirm_password"
              refer={passwordConfirmRef}
            />
            <input
              type="submit"
              className="btn"
              value="Sign up"
              disabled={loading}
            />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>If you have already signed up , that's great !! Please LOGIN</p>
            <Link to="/login">
              <button className="btn transparent" id="sign-up-btn">
                Login
              </button>
            </Link>
          </div>
          <img src={img} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};
export default Register;
