import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TopNav from "./components/TopNav";
import UsersTable from "./components/UsersTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnHover
        theme="colored"
      />
      <TopNav />
      <div>
        <UsersTable />
      </div>
    </>
  );
}

export default App;
