import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import {configureStore} from "@reduxjs/toolkit"
import { Toaster } from "react-hot-toast";


const store = configureStore({
  reducer:rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <Provider store = {store}>
    <BrowserRouter>
        <App />
        {/* Toasts inherit the CodeNest surface tokens so they read as part of
            the product rather than as browser chrome. */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#151E2E",
              color: "#F8FAFC",
              border: "1px solid rgba(148,163,184,0.15)",
              borderRadius: "12px",
              fontSize: "14px",
              padding: "12px 14px",
              boxShadow: "0 16px 40px -20px rgba(0,0,0,0.9)",
            },
            success: { iconTheme: { primary: "#10B981", secondary: "#151E2E" } },
            error: { iconTheme: { primary: "#F43F5E", secondary: "#151E2E" } },
            loading: { iconTheme: { primary: "#6366F1", secondary: "#151E2E" } },
          }}
        />
      </BrowserRouter>
  </Provider>
    
    
  </React.StrictMode>
);
