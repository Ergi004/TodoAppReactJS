import React, { useEffect } from "react";
import AddTodoForm from "../components/AddTodoForm";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return <>{children}</>;
};

const Dashboard: React.FC = () => {
  
  return (
    <AuthGuard>
      <div>
        <AddTodoForm />
      </div>
    </AuthGuard>
  );
};

export default Dashboard;
