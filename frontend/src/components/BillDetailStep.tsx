import React from "react";
import { useQueries } from "../hooks/useQueries";
import { useUserUtils } from "../hooks/useUserUtils";
import ImageModal from "./ImageModal";
import { ZoomIcon, BackIcon } from "./Icons";

interface BillDetailStepProps {
  billId: number;
  onBack: () => void;
  setLoading: (loading: boolean) => void;
}

const BillDetailStep: React.FC<BillDetailStepProps> = ({ billId, onBack }) => {
  const { getUsernameById, isCurrentUser } = useUserUtils();
  const { useBillById, useBillImage, usePact } = useQueries();
  const { data: bill } = useBillById(billId);
  const { data: pact } = usePact();
  const { data: image } = useBillImage(billId, bill?.isImage || false);

  const [showImageModal, setShowImageModal] = React.useState(false);

  const generateImageUrl = (imageData: any) => {
    if (!imageData) return "";
    const uint8Array =
      imageData instanceof Uint8Array
        ? imageData
        : new Uint8Array(imageData.data);
    const blob = new Blob([uint8Array], {
      type: imageData.contentType || "image/jpeg",
    });
    return URL.createObjectURL(blob);
  };

  if (!bill) {
    return (
      <div className="step active">
        <h3>
          <div className="back" onClick={onBack}>
            <BackIcon />
          </div>
          <span>Loading...</span>
        </h3>
      </div>
    );
  }

  const sharePerPerson = Number(bill.amount) / 100 / bill.participants.length;

  return (
    <div className="step active">
      <h3>
        <div className="back" onClick={onBack}>
          <BackIcon />
        </div>
        <span id="bill-title">{bill.name}</span>
      </h3>
      <div id="bill-participants">
        {bill.participants.map((participant) => {
          const username = getUsernameById(participant.toText());
          const isParticipantCurrentUser = isCurrentUser(participant.toText());

          return (
            <div key={participant.toText()} className="pact-user-detail">
              <span>
                {username}
                {isParticipantCurrentUser && <span> - you</span>}
              </span>
              <span>
                {sharePerPerson.toFixed(2)}
                <span>{pact?.currency}</span>
              </span>
            </div>
          );
        })}
      </div>
      <div className="pact-user-detail total">
        <span>Total amount</span>
        <span id="bill-total">
          {(Number(bill.amount) / 100).toFixed(2)}
          <span> {pact?.currency}</span>
        </span>
      </div>

      {bill.isImage && image && (
        <div
          className="pact-user-detail-image"
          id="users-file"
          style={{ display: "block" }}
        >
          <img
            className="image"
            src={generateImageUrl(image)}
            alt="bill photo"
          />
          <div
            className="btn-secondary"
            id="zoom"
            onClick={() => setShowImageModal(true)}
          >
            <ZoomIcon />
            <span>View the bill</span>
          </div>
        </div>
      )}

      <ImageModal
        imageUrl={image ? generateImageUrl(image) : ""}
        isOpen={showImageModal && !!image}
        onClose={() => setShowImageModal(false)}
      />
    </div>
  );
};

export default BillDetailStep;
