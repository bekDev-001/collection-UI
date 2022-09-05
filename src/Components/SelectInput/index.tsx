import React from "react";
import Select from "react-select";
import "./style.css";

type Props = {
   options: any,
  placeholder: string,
  title: string,
  value: any,
  onChange: any,
  name: string,
  isRequired: boolean,
}

const index = ({
  options = [],
  placeholder,
  title,
  value,
  onChange,
  name,
  isRequired,
}: Props) => {
  const defaultValue = (options: any, value: any) => {
    return options ? options.find((option: any) => option.value === value) : "";
  };

  return (
    <div className="container-select-input">
      <div className="text-gray-500 text-xs font-bold uppercase select-input-label">
        {title} {isRequired ? <span className="text-red-500">*</span> : ""}
      </div>
      <Select
        className={"dark:bg-slate-600"}
        name={name}
        placeholder={placeholder}
        options={options}
        value={defaultValue(options, value)}
        onChange={(value: any) => onChange(value)}
      />
    </div>
  );
};

export default index;
