import React from "react";
import { CloseIcon } from "./Icons";

interface ImageModalProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  imageUrl,
  isOpen,
  onClose,
}) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      id="image-modal"
      className={`modal ${isOpen ? "" : "hidden"}`}
      onClick={handleBackdropClick}
    >
      <div className="modal-content-wrapper">
        <span className="close" id="close-modal" onClick={onClose}>
          <CloseIcon />
        </span>
        <img
          className="modal-content"
          id="modal-img"
          src={imageUrl}
          alt="bill photo"
        />
      </div>
    </div>
  );
};

export default ImageModal;
