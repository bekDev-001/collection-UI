import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import SubmitButton from "../../Components/SubmitButton";
import { themeMode } from "../../redux/reducers/darkModeReducer";
import { BsMoonFill } from "react-icons/bs";
import { ImSun } from "react-icons/im";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const status = localStorage.getItem("status");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const handleLogOut = () => {
    navigate("/auth/signIn");
    localStorage.clear();
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language)
  };

  const isLang = localStorage.getItem("language");

  return (
    <div className="bg-gray-100 min-h-screen dark:bg-black">
      <form className="p-6" action="POST">
        <div className="font-bold main-text-color xl:text-2xl md:text-2xl text-xl py-4 dark:text-white">
          {t("settings_title")}
        </div>
        <div className="bg-white dark:bg-dark-mode-card flex flex-col md:flex-row gap-10 box-shadow-wrapper rounded p-6">
          <div className="flex flex-col gap-10 w-96">
            <div className="text-2xl font-medium font-body text-gray-900 pb-4 dark:text-slate-300">
              {t("settings_title1")}
            </div>
            <div className="flex gap-4 font-semibold text-xl text-black dark:text-slate-300">
              <div>{t("settings_language")}</div>
              <div className="flex justify-center">
                <div className="mb-3 w-36">
                  <select
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="form-select appearance-none
                    dark:bg-slate-600
                    dark:text-gray-400
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    border border-solid border-black
                    rounded
                    transition
                    ease-in-out
                    m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                  >
                    {/* <option selected>Open this select menu</option> */}
                    <option selected={isLang === "en"} value="en">English</option>
                    <option selected={isLang === "uz"} value="uz">Uzbek</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-semibold text-xl text-black dark:text-slate-300">{t("settings_theme")} </div>
              <div className="night-mode-button">
                <input
                  type="checkbox"
                  className="opacity-0 absolute checkbox"
                  id="night-mode"
                />
                <label
                  onClick={() => dispatch(themeMode())}
                  htmlFor="night-mode"
                  className="bg-gray-200 flex h-6 rounded-full w-14 justify-between items-center relative px-2 transition-all cursor-pointer border border-black label"
                >
                  <BsMoonFill className="text-gray-800" />
                  <ImSun className="text-yellow-500" />
                  <div className="blob"></div>
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-medium font-body text-gray-900 pb-4 dark:text-slate-300">
              {t("settings_title2")}
            </div>
            <div className="flex gap-7 justify-center items-center">
              <div className="text-5xl md:text-7xl text-gray-500">
                <FaUserCircle />
              </div>
              {userId ? 
              <div>
                <div className="dark:text-slate-400">
                  <span className="font-semibold text-black dark:text-slate-300">{t("settings_name")}:</span>{" "}
                  {username}
                </div>
                <div className="dark:text-slate-400">
                  <span className="font-semibold text-black dark:text-slate-300">{t("settings_email")}:</span>{" "}
                  {email}
                </div>
              </div>:
              <button onClick={() => navigate("/auth/signUp")} type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">{t("create_account")}</button>
            }
            </div>
            {userId ? 
            <div className="w-20 pt-5">
              <SubmitButton title={t("settings_logout")} onClick={handleLogOut} />
            </div>
            : ""
          }
            {status ? 
            <div className="pt-5">
              <button onClick={() => navigate("/admin")} type="button" className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out">Admin Page</button>
            </div>
            : ""
          }
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
