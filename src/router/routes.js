import { Navigate } from "react-router-dom";
import Home from "../Pages/Home/Home";
import ViewMain from "../Pages/ViewMain";
import AddCollection from "../Pages/AddCollection";
import AddItem from "../Pages/AddItem";
import ViewCollection from "../Pages/ViewCollection";
import ViewAllCollection from "../Pages/ViewAllCollection";
import ViewItem from "../Pages/ViewItem";
import Settings from "../Pages/Settings";
import UserOwnCollectons from "../Pages/UserOwnCollectons";

import SignIn from "../Pages/Auth/SignIn";
import SignUp from "../Pages/Auth/SignUp";

export const routes = [
  {
    element: <Home />,
    children: [
      { index: true, path: "/", element: <ViewMain /> },
      { path: "/addCollection", element: <AddCollection /> },
      { path: "/addItem", element: <AddItem /> },
      { path: "/viewCollection", element: <ViewCollection /> },
      { path: "/viewAllCollection", element: <ViewAllCollection /> },
      { path: "/viewItem", element: <ViewItem /> },
      { path: "/settings", element: <Settings /> },
      { path: "/userOwnCollections", element: <UserOwnCollectons /> },
    ],
  },
  {
    path: "/auth",
    children: [
      { path: "/auth/signIn", element: <SignIn /> },
      { path: "/auth/signUp", element: <SignUp /> },
    ],
  },
];
{
  /* <Route path="main" element={<ViewMain />} /> */
}
//    <Route path="addCollection" element={<AddCollection />} />
//    <Route path="addItem" element={<AddItem />} />
//    <Route path="viewCollection" element={<ViewCollection />} />
//    <Route path="viewAllCollection" element={<ViewAllCollection />} />
//    <Route path="viewItem" element={<ViewItem />} />
//    <Route path="settings" element={<Settings />} />
