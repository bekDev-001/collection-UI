import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { FiX } from "react-icons/fi";
import SearchInput from "../SearchInput";
import DropDownButton from "../NavigateButtonDropdown";
import { useTranslation } from "react-i18next";
import "./style.css";

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  const [isNavigation, setIsNavigation] = useState(false);

  const { t } = useTranslation();

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <nav className="w-full shadow-md fixed top-0 backdrop-blur-lg bg-white/30 dark:bg-slate-800/80 z-50 md:flex">
      <div className="flex justify-between items-center w-full py-4 px-9">
        <div className="md:w-52 w-40">
          <SearchInput />
        </div>
        <div className="hidden  items-center gap-3 lg:gap-6 md:gap-4 font-semibold text-gray-800 md:flex">
          <Link
            className="hover:text-blue-500 dark:text-white dark:hover:text-blue-500"
            to={"/"}
          >
            {t("navbar_home")}
          </Link>
          {userId ? (
            <Link
              className="hover:text-blue-500 dark:text-white dark:hover:text-blue-500"
              to={"/userOwnCollections"}
            >
              {t("home_my_collection")}
            </Link>
          ) : (
            ""
          )}
          {userId ? <DropDownButton /> : ""}
          <Link
            to={"/settings"}
            className="hover:text-blue-500 dark:text-white dark:hover:text-blue-500"
          >
            {t("home_settings")}
          </Link>
          {userId ? (
            <div
              onClick={handleSettings}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="text-3xl text-gray-500">
                <FaUserCircle />
              </div>
              <div className="border-b-2 border-blue-500 dark:text-white dark:hover:text-blue-500">
                {username}
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth/signUp")}
              type="button"
              className="inline-block px-5 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              {t("create_account")}
            </button>
          )}
        </div>
        {/* hamburger menu */}
        <div className="block md:hidden">
          <div
            onClick={() => setIsNavigation(true)}
            className="bg-blue-500 px-2 py-1 rounded-lg text-white cursor-pointer text-2xl"
          >
            <HiMenu />
          </div>
          {isNavigation ? (
            <div className="h-screen w-60 transform transition-all fixed duration-700 ease-out text-white flex justify-center p-2 top-0 right-0 bg-slate-300">
              <div className="w-full flex flex-col gap-2">
                <div
                  onClick={() => setIsNavigation(false)}
                  className="text-2xl pb-4 w-full text-blue-500        cursor-pointer text-right"
                >
                  <FiX className="text-right" />
                </div>
                {userId ? (
                  <div
                    onClick={handleSettings}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="text-3xl text-gray-500">
                      <FaUserCircle />
                    </div>
                    <div className="border-b-2 border-blue-500 dark:text-white dark:hover:text-blue-500">
                      {username}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/auth/signUp")}
                    type="button"
                    className="inline-block px-5 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    {t("create_account")}
                  </button>
                )}
                <Link
                  className="hover:text-blue-500 text-slate-600 dark:hover:text-blue-500"
                  to={"/"}
                >
                  {t("navbar_home")}
                </Link>
                {userId ? (
                  <Link
                    className="hover:text-blue-500 text-slate-600 dark:hover:text-blue-500"
                    to={"/userOwnCollections"}
                  >
                    {t("home_my_collection")}
                  </Link>
                ) : (
                  ""
                )}
          <Link
            to={"/addCollection"}
            className="hover:text-blue-500  text-slate-600 dark:hover:text-blue-500"
          >
            Add Collection
          </Link>
          <Link
            to={"/addItem"}
            className="hover:text-blue-500 text-slate-600 dark:hover:text-blue-500"
          >
            Add Item
          </Link>
          <Link
            to={"/settings"}
            className="hover:text-blue-500 text-slate-600 dark:hover:text-blue-500"
          >
            {t("home_settings")}
          </Link>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {/*  */}
      </div>
    </nav>
  );
};
export default Navbar;
