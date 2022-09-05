import React from "react";
import { useTranslation } from "react-i18next";
import "./style.css";

type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  // value: any,
  image: any
}

const UploadImage = ({ onChange,  image }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex-col upload-image-container">
      {image ? (
        <div className="custom-image-upload xl:h-80 flex justify-center items-center">
          <div className="background-part-image">
            <img src={image} alt="foo" />
          </div>
        </div>
      ) : (
        <div className="custom-image-upload xl:h-80 flex justify-center items-center lg:h-52 md:h-40 dark:bg-slate-600">
          <label className="flex flex-col xl:gap-4 items-center my-auto w-full font-medium text-center xl:text-xl lg:text-xl lg:gap-2 md:gap-1 md:text-xl ">
            <svg
              className="xl:w-14 lg:w-9 md:w-7"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_207_4856)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.2644 1.7387L5.00379 0.0206999C4.48913 -0.062784 3.96769 0.108639 3.57088 0.491795C3.17412 0.842809 2.91979 1.36312 2.86656 1.93271L2.62371 4.20497H1.87077C0.802133 4.20497 0.000656317 5.28565 0.000656317 6.50491V17.8384C-0.0262595 19.0011 0.778007 19.9686 1.79709 19.9993C1.82163 20 1.84622 20.0002 1.87077 19.9998H15.2043C16.2729 19.9998 17.2444 19.0577 17.2444 17.8384V17.395C17.5757 17.322 17.89 17.171 18.1673 16.9517C18.5608 16.5737 18.8127 16.0384 18.8716 15.4553L19.9888 4.20497C20.1027 2.98289 19.334 1.88355 18.2644 1.7387ZM16.2729 17.8382C16.2729 18.4478 15.7386 18.8912 15.2043 18.8912H1.8708C1.38813 18.9074 0.985367 18.474 0.971189 17.9233C0.970445 17.8949 0.970771 17.8666 0.972165 17.8382V15.7876L4.73666 12.6287C5.18888 12.2325 5.82584 12.2677 6.24245 12.7118L8.88973 15.372C9.29175 15.7571 9.7978 15.9724 10.3227 15.9816C10.7331 15.9873 11.1367 15.8626 11.4885 15.6214L16.273 12.4624V17.8382H16.2729ZM10.9783 14.6792L16.2729 11.16V6.50472C16.2361 5.85424 15.7751 5.34019 15.2043 5.31319H1.87075C1.33644 5.31319 0.97212 5.89508 0.97212 6.50472V14.4021L4.17798 11.7419C4.98903 11.0561 6.10816 11.1021 6.87384 11.8528L9.54538 14.5407C9.94823 14.9309 10.5237 14.9865 10.9783 14.6792ZM19.0183 4.05511L19.0173 4.06614L17.8758 15.3165C17.8777 15.6082 17.7612 15.8845 17.5601 16.0647C17.5104 16.1213 17.4291 16.1635 17.3614 16.1986C17.2966 16.2322 17.2443 16.2593 17.2443 16.2864V6.50468C17.206 5.24229 16.311 4.23332 15.2042 4.20474H3.59513L3.81371 2.04333C3.86113 1.76344 3.98939 1.50981 4.17803 1.32285C4.39103 1.15482 4.64857 1.07648 4.90666 1.10114L18.143 2.84688C18.6771 2.90474 19.069 3.44569 19.0183 4.05511ZM10.1283 7.05896C9.00161 7.05896 8.0882 8.10108 8.0882 9.38665C8.0882 10.6722 9.00157 11.7143 10.1283 11.7143C11.255 11.7143 12.1684 10.6722 12.1684 9.38665C12.1684 8.10108 11.2551 7.05896 10.1283 7.05896ZM10.1283 10.6061C9.53809 10.6061 9.05965 10.0602 9.05965 9.38681C9.05965 8.71342 9.53809 8.16754 10.1283 8.16754C10.7185 8.16754 11.1969 8.71342 11.1969 9.38681C11.1969 10.0602 10.7185 10.6061 10.1283 10.6061Z"
                  fill="#7D9EB5"
                />
              </g>
              <defs>
                <clipPath id="clip0_207_4856">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {t("add_colletion_choose_title")} <br />
            (JPG,PNG)
          </label>
        </div>
      )}
      <div className="flex justify-center xl:pt-6 md:pt-5">
        <label
          htmlFor="image-upload"
          className={
            image
              ? "upload-image-btn w-full xl:text-sm  font-normal text-center xl:py-2 xl:px-9 md:py-1 md:px-9 md:text-xs rounded-md cursor-pointer"
              : "upload-image-btn w-full xl:text-sm  font-normal text-center xl:py-2 xl:px-3 md:py-1 md:px-2 md:text-xs rounded-md cursor-pointer"
          }
        >
          {image ? "Edit" : t("add_colletion_choose")}
        </label>
        <input
          id="image-upload"
          type="file"
          accept=".jpg, .png"
          onChange={onChange}
          // value={image}
        />
      </div>
    </div>
  );
};

export default UploadImage;
