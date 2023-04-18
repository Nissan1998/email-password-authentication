import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import app from "../../Firebase/Firebase";
import { Link } from "react-router-dom";
const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef();
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    setError("");
    setSuccess("");
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Use a capital Latter");
      return;
    } else if (!/(?=.*[0-9])/.test(password)) {
      setError("put a number");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        if (!user.emailVerified) {
        }
        setSuccess("user login successfully");
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const handleResetPass = (event) => {
    const email = emailRef.current.value;
    if (!email) {
      alert("please provide your email address to reset");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("please check your email");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };
  return (
    <div>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
      <h3>Please Login</h3>
      <form onSubmit={handleLogin} className="p-3 border rounded">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            ref={emailRef}
            className="form-control"
            id="email"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="form-group form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="remember-me"
          />
          <label className="form-check-label" htmlFor="remember-me">
            Remember Me
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <p>
        Forget Password? please{" "}
        <button onClick={handleResetPass} className="btn btn-link">
          Reset Password
        </button>
      </p>
      <p>
        Are you new here? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
