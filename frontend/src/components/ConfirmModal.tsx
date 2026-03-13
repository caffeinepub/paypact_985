import React from "react";

interface ConfirmModalProps {
  title: string;
  subtitle?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  subtitle,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div id="delete-modal" className="modal" onClick={handleBackdropClick}>
      <div className="modal-content-wrapper">
        <div className="title">{title}</div>
        {subtitle && <div className="subtitle">{subtitle}</div>}
        <div className="buttons">
          <div id="cancel" onClick={onCancel}>
            {cancelText}
          </div>
          <div id="remove" onClick={onConfirm}>
            {confirmText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
