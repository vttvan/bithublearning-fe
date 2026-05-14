import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/Auth/context/AuthContext";

const AdminOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-8">Đang tải...</div>;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default AdminOnlyRoute;
