import React, { useState } from "react";
import invitePng from "/assets/invite.png";
import { CopyIcon, BackIcon } from "./Icons";

interface InviteStepProps {
  onBack: () => void;
}

const InviteStep: React.FC<InviteStepProps> = ({ onBack }) => {
  const [showNotification, setShowNotification] = useState(false);
  const inviteUrl = window.location.href;

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="step active">
      <h3>
        <div className="back" onClick={onBack}>
          <BackIcon />
        </div>
        <span>Invite</span>
      </h3>
      <div>
        <label htmlFor="invite">Share this with friends</label>
        <div className="invite-wrapper">
          <input
            type="text"
            name="invite"
            id="invite"
            value={inviteUrl}
            readOnly
          />
          <div onClick={handleCopyClick}>
            <CopyIcon />
          </div>
        </div>
        <img className="invite-image" src={invitePng} alt="invite button" />
        <p
          className={`invite-notification ${showNotification ? "active" : ""}`}
        >
          Invitation link is copied to your buffer
        </p>
      </div>
    </div>
  );
};

export default InviteStep;
