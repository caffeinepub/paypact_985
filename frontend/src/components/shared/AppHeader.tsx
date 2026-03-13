import React from "react";
import { useActor } from "../../hooks/useActor";

interface AppHeaderProps {
  title: string;
  onLogout?: () => void;
  users?: any[];
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  onLogout,
  users = [],
}) => {
  const { logout, principal } = useActor();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    logout();
  };

  const currentUser = users.find(
    (user) => user.id.toText() === principal?.toText(),
  );
  const currentUsername = currentUser?.username;

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">{title}</h1>

        {principal && (
          <div className="user-section">
            {currentUsername && (
              <span className="username">{currentUsername}</span>
            )}
            <button
              onClick={handleLogout}
              className="logout-button"
              type="button"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
