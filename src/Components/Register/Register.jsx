import React, { useState } from "react";
import app from "../../Firebase/Firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { Link } from "react-router-dom";

const auth = getAuth(app);
const Register = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordBlur = (event) => {
    console.log(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    console.log(email, password, name);
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("please at least A uppercase put on the password");
      return;
    } else if (!/(?=.*[0-9])/.test(password)) {
      setError("please set at least a number in you password");
      return;
    } else if (password.length < 6) {
      setError("at least 6 words");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const logedUser = result.user;
        console.log(logedUser);

        event.target.reset();
        setSuccess("You are successfully registered");
        sendVerificationMail(result.user);
        updateUserDAta(result.user, name);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
        event.target.reset();
        setSuccess("");
      });
  };
  const sendVerificationMail = (user) => {
    sendEmailVerification(user).then((result) => {
      console.log(result);
      alert("please verify your email");
    });
  };
  const updateUserDAta = (user, name) => {
    updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        alert("user name updated");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div>
      <p className="text-success">{success}</p>
      <div className="w-100 mx-auto mt-5">
        <h6>Please Register</h6>
        <form onSubmit={handleSubmit}>
          <input
            className="mb-2"
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />
          <br />
          <input
            className="mb-2"
            onChange={handleEmailChange}
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            required
          />
          <br />
          <input
            onBlur={handlePasswordBlur}
            type="password"
            name="password"
            id="password"
            placeholder="type Password"
            required
          />
          <br />
          <p className="text-danger">{error}</p>
          <input type="submit" value="Register" />
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
