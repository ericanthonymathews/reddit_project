import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteCommentForm from "../DeleteCommentForm";

function DeleteCommentModal({ comment }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="nav-btn-btn">
        <i className="fa-solid fa-trash"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteCommentForm setShowModal={setShowModal} comment={comment} />
        </Modal>
      )}
    </>
  );
}

export default DeleteCommentModal;
