import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import LoginForm from "../auth/LoginForm";

function CreateCommunityModal() {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const onClick = (e) => {
    if (!user) {
      setShowModal(true);
    } else {
      history.push(`/communities/new`);
    }
  };
  const onClose = (e) => {
    setShowModal(false);
  };
  return (
    <>
      <button onClick={onClick} id="crt-cmm-btn">
        <i className="fa-solid fa-plus"></i> Create a New Community
      </button>
      {showModal && (
        <Modal onClose={onClose}>
          <LoginForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreateCommunityModal;
