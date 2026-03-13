import React, { useState, useEffect } from "react";
import { useUserUtils } from "../hooks/useUserUtils";

interface UserCheckboxesProps {
  selectedParticipants: string[];
  onChange: (participants: string[]) => void;
}

const UserCheckboxes: React.FC<UserCheckboxesProps> = ({
  selectedParticipants,
  onChange,
}) => {
  const { users, isCurrentUser } = useUserUtils();

  const [checkAllState, setCheckAllState] = useState<"none" | "some" | "all">(
    "none",
  );

  useEffect(() => {
    if (selectedParticipants.length === 0) {
      setCheckAllState("none");
    } else if (selectedParticipants.length === users.length) {
      setCheckAllState("all");
    } else {
      setCheckAllState("some");
    }
  }, [selectedParticipants, users]);

  const handleCheckAll = () => {
    if (checkAllState === "all") {
      onChange([]);
    } else {
      onChange(users.map((user) => user.id.toText()));
    }
  };

  const handleUserToggle = (userId: string) => {
    if (selectedParticipants.includes(userId)) {
      onChange(selectedParticipants.filter((id) => id !== userId));
    } else {
      onChange([...selectedParticipants, userId]);
    }
  };

  return (
    <>
      <div className="checkbox-wrapper">
        <label
          className={`custom-checkbox custom-checkbox-all ${checkAllState === "some" ? "partial" : ""}`}
        >
          <input
            type="checkbox"
            id="check-all"
            checked={checkAllState === "all"}
            ref={(input) => {
              if (input) {
                input.indeterminate = checkAllState === "some";
              }
            }}
            onChange={handleCheckAll}
          />
          <span className="checkmark"></span>
          <span className="checkbox-text">Check all</span>
        </label>
        <div id="user-list">
          {users.map((user) => {
            const isThisCurrentUser = isCurrentUser(user.id.toText());
            return (
              <label key={user.id.toText()} className="custom-checkbox">
                <input
                  type="checkbox"
                  name="members"
                  value={user.id.toText()}
                  checked={selectedParticipants.includes(user.id.toText())}
                  onChange={() => handleUserToggle(user.id.toText())}
                />
                <span className="checkmark"></span>
                <span className="checkbox-text">
                  {user.username}
                  {isThisCurrentUser && <span> - you</span>}
                </span>
              </label>
            );
          })}
        </div>
      </div>
      <input
        className="hidden-input"
        name="users"
        id="users"
        value={
          selectedParticipants.length
            ? JSON.stringify(selectedParticipants)
            : ""
        }
        required
        readOnly
      />
    </>
  );
};

export default UserCheckboxes;
