import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { clearUserPostVotes } from "../../store/votes";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(clearUserPostVotes());
  };

  return (
    <button onClick={onLogout} className="nav-btn-btn">
      Logout
    </button>
  );
};

export default LogoutButton;
