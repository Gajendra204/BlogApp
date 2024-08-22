import React from "react";

function Logo({ width = "100px", imageUrl }) {
  return (
    <div>
      <img
        src={"src/assets/Logo.png"} 
        alt="Logo"
        style={{ width }}
      />
    </div>
  );
}

export default Logo;
