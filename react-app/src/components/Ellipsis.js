import { useSelector } from "react-redux";
const Ellipsis = () => {
  const user = useSelector((state) => state.session.user);
};

export default Ellipsis;
