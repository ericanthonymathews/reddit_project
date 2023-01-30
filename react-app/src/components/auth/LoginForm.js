import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import DemoButton from "../DemoButton";

const LoginForm = () => {
  // const [errors, setErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      const eErrors = [];
      const pErrors = [];
      data.forEach((error) => {
        let fieldsAndErrors = error.split(":");
        if (fieldsAndErrors[0] === "email ") {
          eErrors.push(fieldsAndErrors[1]);
        }
        if (fieldsAndErrors[0] === "password ") {
          pErrors.push(fieldsAndErrors[1]);
        }
      });
      setEmailErrors(eErrors);
      setPasswordErrors(pErrors);
      // setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onLogin} class="flex-column">
      <label>Log In</label>
      {/* <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div> */}
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
          name="email"
          type="text"
          placeholder="Email*"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        {passwordErrors.map((error, ind) => (
          <div key={`password-${ind}`} className="error-text">
            {error}
          </div>
        ))}
      </div>
      <div>
        <input
          className="input-small"
          name="password"
          type="password"
          placeholder="Password*"
          value={password}
          onChange={updatePassword}
        />
      </div>
      <button type="submit" className="single-btn-btn">
        Login
      </button>
      <DemoButton />
    </form>
  );
};

export default LoginForm;
