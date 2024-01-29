import React from "react";
import styles from "./App.module.scss";
import cx from "classnames";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import { HotelProvider } from "./context";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return (
    <div className={cx(styles.App)}>
      <HotelProvider>
        <RouterProvider router={BrowserRouter} />
      </HotelProvider>
    </div>
  );
}

export default App;
