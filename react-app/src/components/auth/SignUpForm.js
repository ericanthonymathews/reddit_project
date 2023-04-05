import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import DemoButton from "../DemoButton";

const SignUpForm = () => {
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [usernameErrors, setUsernameErrors] = useState([]);
  const [repeatPasswordErrors, setRepeatPasswordErrors] = useState([]);
  // const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    // if (password === repeatPassword) {
    const data = await dispatch(
      signUp(username, email, password, repeatPassword)
    );
    if (data) {
      const eErrors = [];
      const pErrors = [];
      const uErrors = [];
      const rErrors = [];
      data.forEach((error) => {
        let fieldsAndErrors = error.split(":");
        if (fieldsAndErrors[0] === "email ") {
          eErrors.push(fieldsAndErrors[1]);
        }
        if (fieldsAndErrors[0] === "password ") {
          pErrors.push(fieldsAndErrors[1]);
        }
        if (fieldsAndErrors[0] === "username ") {
          uErrors.push(fieldsAndErrors[1]);
        }
        if (fieldsAndErrors[0] === "repeat_password") {
          rErrors.push(fieldsAndErrors[1]);
        }
      });
      setEmailErrors(eErrors);
      setPasswordErrors(pErrors);
      setUsernameErrors(uErrors);
      setRepeatPasswordErrors(rErrors);
      // setErrors(data);
    }
    // } else {
    //   setPasswordErrors(["Passwords must match"]);
    // }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp} className="flex-column">
      <label>Sign Up</label>
      {/* <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}
      <div>
        {usernameErrors.map((error, ind) => (
          <div key={`username-${ind}`} className="error-text">
            {error}
          </div>
        ))}
      </div>
      <div>
        <input
          className="input-small"
          placeholder="Username(no_spaces)*"
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        {emailErrors.map((error, ind) => (
          <div key={`email-${ind}`} className="error-text">
            {error}
          </div>
        ))}
      </div>
      <div>
        <input
          className="input-small"
          type="text"
          name="email"
          placeholder="Email*"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <div>
          {passwordErrors.map((error, ind) => (
            <div key={`password-${ind}`} className="error-text">
              {error}
            </div>
          ))}
        </div>
        <input
          className="input-small"
          placeholder="Password*"
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <div>
          {repeatPasswordErrors.map((error, ind) => (
            <div key={`repeat-password-${ind}`} className="error-text">
              {error}
            </div>
          ))}
        </div>
        <input
          className="input-small"
          type="password"
          placeholder="Repeat Password*"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
        ></input>
      </div>
      <button type="submit" className="single-btn-btn">
        Sign Up
      </button>
      <DemoButton />
    </form>
  );
};

export default SignUpForm;
