import React, { MouseEventHandler } from "react";
type ButtonProps = {
  action: MouseEventHandler;
  type: string;
  name: string;
};
const Button = ({ action, type, name }: ButtonProps) => {
  const styles: { [submit: string]: string } = {
    submit: "bg-blue-500 hover:bg-blue-700",
  };
  return (
    <button
      className={`${styles[type] || ""} text-white font-bold py-2 px-4 rounded`}
      onClick={action}
    >
      {name}
    </button>
  );
};
export default Button;
