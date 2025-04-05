"use client";

import "../styles/UserAuthentication.css";
import { useState } from "react";

export default function LogoutModal({ onClose, onLogout }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    onLogout(); // Call the logout function (passed as a prop)
    setIsOpen(false);
  };

    return (
        isOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Are you sure you want to log out?</h2>
              <div className="modal-buttons">
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
                <button className="cancel-btn" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
    
          </div>
        )
      );
}
