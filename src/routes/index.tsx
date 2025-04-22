import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import CalendarGrid from "../pages/CalendarGrid";

// Import the App component

// Define routes
const routeRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <CalendarGrid />,
      },
      // Add more routes as needed
      // {
      //   path: "/other-route",
      //   element: <OtherComponent />
      // }
    ],
  },
]);

export default routeRouter;
