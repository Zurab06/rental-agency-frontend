import { useSelector } from "react-redux";
import Status from "./Status/Status";
import UserPageLogo from "./UserPage/UserPageLogo";

const Authorization = () => {
  const user = useSelector((state) => state.user);
  return user.token || user.signIn ? <UserPageLogo /> : <Status />;
};

export default Authorization;
