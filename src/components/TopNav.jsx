import React from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const TopNav = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "5rem",
        backgroundColor: "#00ad7f",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "white",
        paddingLeft: "1rem",
        marginBottom: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        <AdminPanelSettingsIcon />
        <h2 style={{ fontWeight: "300" }}>Admin Panel</h2>
      </div>
    </div>
  );
};

export default TopNav;
