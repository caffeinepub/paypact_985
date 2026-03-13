import React from "react";

interface LoadingOverlayProps {
  isActive: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isActive }) => {
  return (
    <div className={`loader-overlay ${isActive ? "active" : ""}`}>
      <div className="loader"></div>
    </div>
  );
};

export default LoadingOverlay;
