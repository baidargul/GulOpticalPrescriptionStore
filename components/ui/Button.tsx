import React from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className="w-full p-2 bg-gradient-to-t from-zinc-100 to-zinc-50 rounded px-4 border"
    >
      {props.children}
    </button>
  );
};

export default Button;
