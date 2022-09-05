import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import SearchInput from "../SearchInput";
import DropDownButton from "../NavigateButtonDropdown";
import { useTranslation } from "react-i18next";
import "./style.css";

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  const { t } = useTranslation();

  const handleSettings = () => {
    navigate("/settings")
  }


  return (
    <nav className="w-full shadow-md fixed top-0 backdrop-blur-lg bg-white/30 dark:bg-slate-800/80 z-50 md:flex hidden">
      <div className="flex justify-between items-center w-full py-4 px-9">
        <div>
          <SearchInput />
        </div>
        <div className="flex items-center gap-6 font-semibold text-gray-800">
          <Link className="hover:text-blue-500 dark:text-white dark:hover:text-blue-500" to={"/"}>{t("navbar_home")}</Link>
          {userId ? 
          <Link className="hover:text-blue-500 dark:text-white dark:hover:text-blue-500" to={"/userOwnCollections"}>{t("home_my_collection")}</Link>
          : ""
          }
          {userId ? 
          <DropDownButton /> : 
          ""
          }
          <Link
            to={"/settings"}
            className="hover:text-blue-500 dark:text-white dark:hover:text-blue-500"
          >
            {t("home_settings")}
          </Link>
          {userId ? 
          <div onClick={handleSettings} className="flex items-center gap-2 cursor-pointer"> 
            <div className="text-3xl text-gray-500">
              <FaUserCircle />
            </div>
            <div className="border-b-2 border-blue-500 dark:text-white dark:hover:text-blue-500">
              {username}
            </div>
          </div>: 
          <button onClick={() => navigate("/auth/signUp")} type="button" className="inline-block px-5 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">{t("create_account")}</button>
        }
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
