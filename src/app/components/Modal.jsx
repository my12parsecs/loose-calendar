// "use client";

import { AuthButton } from "./Auth";

export default function Modal({ onClose }) {
  return (
    <div 
     onClick={onClose}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        textAlign: "center"
      }}>
        <h2 style={{ margin: "0 0 10px 0", fontSize: "20px", fontWeight: "bold" }}>Modal Title</h2>
        <p>This modal is triggered from the Nav component.</p>
        <AuthButton />
        <button
          onClick={onClose}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
