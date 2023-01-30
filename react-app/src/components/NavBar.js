import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import SignUpFormModal from "./SignUpFormModal";
import LoginFormModal from "./LoginFormModal";
import breadItLogo from "../static/breadItLogo.png";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  return (
    <>
      <div id="nav-bar">
        <img
          src={breadItLogo}
          alt="logo for homepage"
          id="logo"
          onClick={() => history.push("/")}
        />

        <div id="auth-btns">
          {!user && <LoginFormModal />}
          {!user && <SignUpFormModal />}
          {user && <LogoutButton />}
        </div>
      </div>
      <div id="side-bar">
        <div className="home-btn" onClick={() => history.push("/")}>
          <i
            className="fa-solid fa-house"
            style={{ color: "#b3b3b3", margin: "0px 10px" }}
          ></i>
          Home
        </div>
      </div>
    </>
  );
};

export default NavBar;
