import React from "react";

function Logo({ width = "100px", imageUrl }) {
  return (
    <div>
      <img
        src={"src/assets/Logo.png"} // Corrected the path
        alt="Logo"
        style={{ width }}
      />
    </div>
  );
}

export default Logo;
