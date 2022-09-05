import React from "react";

interface Props {
    title: string;
    onClick: any;
}

const SubmitButton = ({title, onClick} : Props) => {
  return (
      <div className="w-full">
        <button
            onClick={onClick}
          type="button"
          className="py-3 w-full bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          {title}
        </button>
      </div>
  );
};

export default SubmitButton;
