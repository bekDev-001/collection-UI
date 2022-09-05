import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import "./index.css";

type Props = {
  type: string,
  placeholder: string,
  label: string,
  value: any,
  onChange: any,
  name: string,
  disabled: boolean,
  isRequired: boolean
}

const Input = ({
  type,
  placeholder,
  label,
  value,
  onChange,
  name,
  disabled,
  isRequired,
}: Props) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-gray-500 text-xs font-bold uppercase pb-1">
          {label}{" "}
          {isRequired === true ? <span className="text-red-500">*</span> : ""}
        </div>
      </div>
      <input
        className={"login-input placeholder:main-input-color border input-color-border outline-none w-full text-sm font-normal rounded-md py-2 px-4 dark:bg-slate-700 dark:text-white" }
        disabled={disabled}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
