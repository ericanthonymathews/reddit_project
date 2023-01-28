import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignUpForm from "../auth/SignUpForm";

function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="nav-btn-btn">
        Sign Up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;
