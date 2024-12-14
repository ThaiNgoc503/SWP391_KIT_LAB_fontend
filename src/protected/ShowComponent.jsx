import Notification from "../customer/components/Notification";

const getUserRole = () => {
  const token = localStorage.getItem("jwt");
  if (!token) return null;
  const user = JSON.parse(token);
  return user.ROLE;
};

export const ShowComponent = ({ roleRequired, children }) => {
  const userRole = getUserRole();
  if (!roleRequired.includes(userRole)) {
    return null;
  }
  return <>{children}</>;
};
