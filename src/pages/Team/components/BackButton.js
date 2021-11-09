import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackButton(prop) {
  return (
    <button
      onClick={() => prop.this.props.history.goBack()}
      className="p-1 rounded-full border-2 border-black flex items-center justify-center"
    >
      <ArrowBackIcon />
    </button>
  );
}