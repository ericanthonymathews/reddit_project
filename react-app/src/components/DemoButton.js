import { useDispatch } from "react-redux";
import { login } from "../store/session";

const DemoButton = () => {
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
  };

  return (
    <button className="nav-btn-btn" onClick={submit}>
      Demo
    </button>
  );
};

export default DemoButton;
