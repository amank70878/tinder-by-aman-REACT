import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import React from "react";
import "../styles/header.css";
import { Link, useNavigate } from "react-router-dom";
import { SiTinder } from "react-icons/si";
import SettingsIcon from "@mui/icons-material/Settings";

const Header = ({ Icon, href, RightIcon }) => {
  var _user = localStorage.getItem("tinder-by-aman-user");
  const user = JSON.parse(_user);

  // menu m-ui
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // logout functionality
  const navigate = useNavigate();
  const logoutFunc = () => {
    localStorage.removeItem("tinder-by-aman-id");
    navigate("/login");
  };

  return (
    <>
      <section className="header__section">
        {Icon === Avatar ? (
          <Link to={href}>
            <IconButton>
              {user ? (
                <Avatar className="header__backLogo" src={user.photoUrl} />
              ) : (
                <Avatar />
              )}
            </IconButton>
          </Link>
        ) : (
          <Link to={href}>
            <IconButton>
              <Icon className="header__backLogo" />
            </IconButton>
          </Link>
        )}

        <Link to="/" className="link">
          <IconButton>
            <SiTinder className="tinder__logo" />
          </IconButton>
        </Link>
        {RightIcon === SettingsIcon ? (
          <>
            <IconButton
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <RightIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={(handleClose, logoutFunc)}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Link to="chatsSection/" className="link">
            <IconButton>
              <ChatIcon />
            </IconButton>
          </Link>
        )}
      </section>
    </>
  );
};

export default Header;
