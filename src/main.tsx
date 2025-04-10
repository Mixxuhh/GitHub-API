import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import CandidateSearch from "./pages/CandidateSearch.tsx";
import SavedCandidates from "./pages/SavedCandidates.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import { validateEnv } from "./utils/env.ts";

// Validate environment variables before rendering the app
try {
  validateEnv();
} catch (error) {
  // If there's an error with environment variables, show an error page
  const rootElement = document.getElementById("root");
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Environment Error
          </h1>
          <p className="text-gray-700 mb-4">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
          <p className="text-sm text-gray-500">
            Please check your .env file and make sure all required environment
            variables are set correctly.
          </p>
        </div>
      </div>
    );
  }
  throw error; // Re-throw to prevent the app from continuing
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CandidateSearch />,
      },
      {
        path: "saved",
        element: <SavedCandidates />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
