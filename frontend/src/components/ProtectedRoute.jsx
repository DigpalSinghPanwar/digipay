import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ Component }) => {
  const navigate = useNavigate();

  const auth = localStorage.getItem("token");

  useEffect(() => {
    if (auth === null) {
      navigate("/");
    }
  }, [auth]);

  return <div> {auth === null ? <Navigate to={"/"} /> : Component}</div>;
};

export default ProtectedRoute;
