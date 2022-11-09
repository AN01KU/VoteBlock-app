import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from "react";
import FormInput from '../components/FormInput';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/registration_from.css";


const AdminLogin = () => {
    const { login } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/adminHome');
        } catch {
            setError("Failed to sign in");
        }

        setLoading(false);
    }

    return (
        <div className="center">
            <div className="header">Login Form</div>
            <form onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    placeholder="Email Address"
                    name="email_address"
                    refer={emailRef}
                />
                <i className="far fa-envelope"><FontAwesomeIcon icon={faEnvelope} /></i>
                <FormInput
                    type="password"
                    placeholder="Password"
                    name="password"
                    refer={passwordRef}
                />
                <i className="fas fa-lock"><FontAwesomeIcon icon={faLock} /></i>
                <input type="submit" value="Login" />
                <a href="#">Forgot Password?</a>
            </form>
        </div>
    )
}

export default AdminLogin

