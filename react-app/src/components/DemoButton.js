import { useDispatch } from "react-redux";
import { login } from "../store/session";
import { getUserPostVotesThunk } from "../store/votes";

const DemoButton = () => {
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
    await dispatch(getUserPostVotesThunk());
  };

  return (
    <button className="single-btn-btn" onClick={submit}>
      Demo User
    </button>
  );
};

export default DemoButton;
