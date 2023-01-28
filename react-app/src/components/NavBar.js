import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import SignUpFormModal from "./SignUpFormModal";
import LoginFormModal from "./LoginFormModal";
import DemoButton from "./DemoButton";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  return (
    <>
      <div id="nav-bar">
        <NavLink to="/" exact={true} activeClassName="active">
          Home
        </NavLink>
        <div id="auth-btns">
          {!user && <LoginFormModal />}
          {!user && <SignUpFormModal />}
          {!user && <DemoButton />}
          {user && <LogoutButton />}
        </div>
      </div>
      <div id="side-bar">
        <div className="home-btn" onClick={() => history.push("/")}>
          <i
            class="fa-solid fa-house"
            style={{ color: "#b3b3b3", margin: "0px 10px" }}
          ></i>
          Home
        </div>
      </div>
    </>
  );
};

export default NavBar;
