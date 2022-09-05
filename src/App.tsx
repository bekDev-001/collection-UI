import React, {Suspense} from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Auth/SignUp";
import Login from "./Pages/Auth/SignIn";
import ViewMain from "./Pages/ViewMain";
import Settings from "./Pages/Settings";
import AddCollection from "./Pages/AddCollection";
import ViewCollection from "./Pages/ViewCollection";
import ViewAllCollection from "./Pages/ViewAllCollection";
import ViewItem from "./Pages/ViewItem";
import AddItem from "./Pages/AddItem";

import {routes} from "./router/routes"


function App() {
  const content = useRoutes(routes)
  return (
    <section>
      {content}
    </section>
    // <Routes>
    //   <Route index element={<Home />} />
    //   <Route path="home" element={<Home />}>
    //    <Route path="main" element={<ViewMain />} />
    //    <Route path="addCollection" element={<AddCollection />} />
    //    <Route path="addItem" element={<AddItem />} />
    //    <Route path="viewCollection" element={<ViewCollection />} />
    //    <Route path="viewAllCollection" element={<ViewAllCollection />} />
    //    <Route path="viewItem" element={<ViewItem />} />
    //    <Route path="settings" element={<Settings />} />
    //   </Route>
    //   <Route path="auth">
    //     <Route path="signUp" element={<Register />} />
    //     <Route path="signIn" element={<Login />} />
    //   </Route>
    //   <Route path="*" element={<Home />} />
    // </Routes>
  );
}

export default App;
