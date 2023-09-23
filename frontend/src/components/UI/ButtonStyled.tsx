import React, { useState } from "react";

interface ButtonStyledProps {
  handleClick: () => void;
  text: string;
  styling?: string;
}

const ButtonStyled = ({ handleClick, text, styling }: ButtonStyledProps) => {
  return (
    <a
      href="#"
      onClick={handleClick}
      className={`${styling ? styling : ""} bg-indigo-600 rounded text-white duration-150 hover:bg-indigo-800 active:shadow-lg font-medium inline-flex text-center`}
    >
      {text}
    </a>
  );
};

export default ButtonStyled;
