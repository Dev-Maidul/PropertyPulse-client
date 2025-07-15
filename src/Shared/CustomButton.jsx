import React from "react";
import { Link } from "react-router-dom";

const colorMap = {
  red: {
    bg: "bg-red-500",
    hoverBg: "bg-red-600",
    dot: "bg-red-700",
  },
  gray: {
    bg: "bg-gray-800",
    hoverBg: "bg-gray-700",
    dot: "bg-gray-600",
  },
  blue: {
    bg: "bg-blue-500",
    hoverBg: "bg-blue-600",
    dot: "bg-blue-700",
  },
  green: {
    bg: "bg-green-500",
    hoverBg: "bg-green-600",
    dot: "bg-green-700",
  },
};

const CustomButton = ({
  text = "Button",
  to,
  onClick,
  color = "red",
  className = "",
  ...rest
}) => {
  const colors = colorMap[color] || colorMap.red;

  const buttonBody = (
    <span
      className={`relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium rounded-xl group
        ${colors.bg} transition-all duration-500 ease-in-out
        hover:scale-105 active:scale-100
        ${className}
      `}
    >
      <span
        className={`absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out ${colors.dot} rounded group-hover:-mr-4 group-hover:-mt-4`}
      >
        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
      </span>
      <span
        className={`absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full ${colors.hoverBg} rounded-2xl group-hover:mb-12 group-hover:translate-x-0`}
      ></span>
      <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
        {text}
      </span>
    </span>
  );

  if (to) {
    return (
      <Link
        to={to}
        className="group cursor-pointer select-none"
        {...rest}
      >
        {buttonBody}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      className="group cursor-pointer select-none"
      type="button"
      {...rest}
    >
      {buttonBody}
    </button>
  );
};

export default CustomButton;