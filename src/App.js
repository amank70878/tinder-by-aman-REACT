import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import ChatsRow from "./page/ChatsRow";
import Home from "./page/Home";
import Chats from "./components/Chats";
import Login from "./page/Login";
import Profile from "./page/Profile";
import FetchInfo from "./page/FetchInfo";

const App = () => {
  return (
    <BrowserRouter>
      <section className="app__body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login/" element={<Login />} />
          <Route path="me/" element={<Profile />} />
          <Route path="fetchinfo/" element={<FetchInfo />} />
          <Route path="chatsSection/" element={<ChatsRow />} />
          <Route path="chats/:msg" element={<Chats />} />
        </Routes>
      </section>
      {/* <ToastContainer delay={3000} position={"bottom-center"} /> */}
    </BrowserRouter>
  );
};

export default App;
