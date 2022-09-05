import React, {CSSProperties} from "react";
import Navbar from "../../Components/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loading";
const Home = () => {

  const darkMode = useSelector((state: any) => state.darkTheme.value);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <div className="bg-white dark:bg-black overflow-auto">
        <Loading />
        <Navbar />
        <div className="mt-20">
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
