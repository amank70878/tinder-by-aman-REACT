import React from "react";
import Header from "../components/Header";
import { BsArrowLeftCircle } from "react-icons/bs";
import "../styles/profile.css";
import { Avatar } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const Profile = () => {
  var _user = localStorage.getItem("tinder-by-aman-user");
  const user = JSON.parse(_user);

  return (
    <>
      <section className="profile__Section">
        <Header Icon={BsArrowLeftCircle} href="/" RightIcon={SettingsIcon} />
        <div className="profile__body">
          {user ? (
            <div className="profile__userInfo">
              <Avatar className="profile__svg" src={user.photoUrl} />
              <span>
                <h1>Name: {user.name}</h1>
                <h3>Email: {user.email}</h3>
              </span>
            </div>
          ) : (
            "fetching user Details ...."
          )}
          <div className="profile__pageInfo">
            <h1>tinder-by-aman</h1>
            <span>
              tinder-by-aman is a tinder clone project for my react Journey.
              <br />
              I'm trying to copy all the major functionalities of the tinder
              app.
              <br />
              This clone is just made for practice purpose and to add this in my
              resume.
              <br />
              I'm going to make this a very clean project.
              <br />
              Thank You.
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
