// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";

// Import Context
import { AuthProvider } from "./services/AuthContext";

//pages
import EditPlant from "./pages/editPlant/EditPlant";
import Garden from "./pages/garden/Garden";
import Homepage from "./pages/homepage/Homepage";
import PlantDetails from "./pages/plantDetails/PlantDetails";
import Plants from "./pages/plants/Plants";
//API

import { getAllPlants } from "./services/request";
import { getPlantDetails } from "./services/request";
import { getUserPlants } from "./services/request";
import { getPlantsSearch } from "./services/request";
import { getEarth } from "./services/request";
/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
        loader: getAllPlants,
      },
      {
        path: "/plantdetails/:id",
        element: <PlantDetails />,
        loader: ({ params }) => getPlantDetails(params.id),
      },
      {
        path: "/edit-plant/:id",
        element: <EditPlant />,
        loader: async ({ params }) => {
          const plant = await getPlantDetails(params.id);
          const earthTypes = await getEarth();
          return { plant, earthTypes };
        },
      },

      {
        path: "/plants",
        element: <Plants />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const earthType = url.searchParams.get("earth_type") || "";
          const name = url.searchParams.get("name") || "";

          const [plants, earthTypes] = await Promise.all([
            getPlantsSearch(earthType, name),
            getEarth(),
          ]);

          return { plants, earthTypes };
        },
      },
      {
        path: "/my-garden",
        element: <Garden />,
        loader: getUserPlants,
      },
    ],
  },
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
