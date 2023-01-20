import Notification from "./Notification";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../reducers/userReducer";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged-in</p>
      <button onClick={() => dispatch(handleLogout())}>logout</button>
    </div>
  );
};

export default Home;
