"use client";
import React, { useRef } from "react";

type Props = {
  value?: string;
  setValue?: (value: string) => void;
  placeholder?: string;
  readonly?: boolean;
  type?: "text" | "number";
  textAlign?: "left" | "center" | "right";
  label?: string;
  className?: string;
  onFocus?: () => void;
};

const TextBox = (props: Props) => {
  const txtRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: any) => {
    if (props.setValue) {
      props.setValue(e.target.value);
    }
  };

  const alignText = props.textAlign ? `text-${props.textAlign}` : "text-left";

  const handleFocus = () => {
    if (txtRef.current) {
      txtRef.current.select();
    }

    if (props.onFocus) props.onFocus();
  };

  return (
    <div className="w-full relative">
      {props.label && props.label.length > 0 && (
        <div className="text-xs absolute -top-2 -left-2 px-4 text-zinc-500">
          {props.label}
        </div>
      )}
      <input
        onFocus={handleFocus}
        ref={txtRef}
        className={`w-full h-full p-2 ${alignText} appearance-none border border-zinc-200 selection:bg-red-100 outline-none ring-0 ${
          props.className && props.className
        }`}
        onChange={handleChange}
        placeholder={props.placeholder ? props.placeholder : ""}
        readOnly={props.readonly ? true : false}
        value={props.value}
        type={props.type ? props.type : "text"}
      />
    </div>
  );
};

export default TextBox;
