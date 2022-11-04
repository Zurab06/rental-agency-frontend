import { useSelector } from "react-redux";
import Status from "./Status/Status";
import UserPage from "./UserPage/UserPage";

const Authorization = () => {
  const user = useSelector((state) => state.user);
  return user.token || user.signIn ? <UserPage /> : <Status />;
};

export default Authorization;
