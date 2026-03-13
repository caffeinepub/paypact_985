import React from "react";
import { LogoIcon } from "./Icons";
import dfinityPng from "/assets/dfinity.png";

interface LoginStepProps {
  onLogin: () => void;
}

const LoginStep: React.FC<LoginStepProps> = ({ onLogin }) => {
  return (
    <div className="step step-start active">
      <div className="logo">
        <LogoIcon />
      </div>
      <div className="main-text">
        <h1>Split expenses the smart way</h1>
        <div className="separator"></div>
        <h2>start a pact</h2>
      </div>
      <button className="btn" onClick={onLogin}>
        <span>Sign in</span>
      </button>
      <img className="dfinity-logo" src={dfinityPng} alt="internet computer" />
    </div>
  );
};

export default LoginStep;
