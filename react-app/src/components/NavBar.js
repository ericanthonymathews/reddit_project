import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import SignUpFormModal from "./SignUpFormModal";
import LoginFormModal from "./LoginFormModal";
import DemoButton from "./DemoButton";

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  return (
    <>
      <nav>
        <ul>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
          <div id="auth-btns">
            {!user && <LoginFormModal />}
            {!user && <SignUpFormModal />}
            {!user && <DemoButton />}
            {user && <LogoutButton />}
          </div>
        </ul>
      </nav>
      <div id="side-bar">
        <NavLink to="/" exact={true} activeClassName="active">
          Home
        </NavLink>
      </div>
    </>
  );
};

export default NavBar;
