import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getData } from "../../context/userContext";
import LoginDialog from "../../pages/LoginDialog";

const ProtectedRoute = ({ children }) => {
  const { user } = getData();
  const location = useLocation();

  const [openLogin, setOpenLogin] = useState(false);

  useEffect(() => {
    if (!user) {
      setOpenLogin(true);
    }
  }, [user]);

  // User is authenticated
  if (user) {
    return children;
  }

  // User is not authenticated
  return (
    <>
      <LoginDialog
        open={openLogin}
        setOpen={setOpenLogin}
        showTrigger={false}
      />

      <div className="min-h-screen" />
    </>
  );
};

export default ProtectedRoute;