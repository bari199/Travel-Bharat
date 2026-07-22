import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const ProtectedRoute = ({ children }) => {

  const { admin, loading } = useAdminAuth();


  if (loading) {
    return (
      <div>
        Loading...
      </div>
    );
  }


  if (!admin) {
    return (
      <Navigate 
        to="/admin/login" 
        replace 
      />
    );
  }


  return children;
};


export default ProtectedRoute;