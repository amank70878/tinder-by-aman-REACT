import { signInWithPopup } from "firebase/auth";
import React, { useEffect } from "react";
import { auth, provider } from "../firebaseConfig";
import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { SiTinder } from "react-icons/si";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInFunc = () => {
    signInWithPopup(auth, provider).then((data) => {
      // setLocalToken(data._tokenResponse.localId);
      localStorage.setItem("tinder-by-aman-id", data._tokenResponse.localId);

      const checkUserFunc = async () => {
        const q = query(
          collection(db, `users`),
          where("email", "==", `${data.user.email}`)
        );
        const docSnap = await getDocs(q);
        console.log(`docSnap is ${docSnap}`);
        if (docSnap._snapshot.docs.size > 0) {
          console.log("email exists so you are signed in");
          const _users = {
            name: data.user.displayName,
            email: data.user.email,
            photoUrl: data.user.photoURL,
          };
          localStorage.setItem("tinder-by-aman-user", JSON.stringify(_users));

          dispatch({
            type: "setUser",
            payload: _users,
          });
          navigate("/");
        } else {
          console.log(
            "email does not exist,please proceed further for your details"
          );
          const _initials = {
            loginId: data._tokenResponse.localId,
            name: data.user.displayName,
            email: data.user.email,
            photoUrl: data.user.photoURL,
          };
          dispatch({
            type: "setInitialUser",
            payload: _initials,
          });
          navigate("/fetchinfo");
        }
      };
      checkUserFunc();
    });
  };

  useEffect(() => {
    // setLocalToken(localStorage.getItem("tinder-by-aman-id"));
    // fetchUserByLocalToken();
    localStorage.removeItem("tinder-by-aman-id");
    localStorage.removeItem("tinder-by-aman-user");
  }, []);

  // const [localToken, setLocalToken] = useState("");
  // const fetchUserByLocalToken = async () => {
  //   if (localToken) {
  //     console.log("token is here now searching for user... in login");
  //     const q = query(
  //       collection(db, `users`),
  //       where("loginId", "==", `${localToken}`)
  //     );
  //     const docSnap = await getDocs(q);
  //     if (docSnap._snapshot.docs.size > 0) {
  //       navigate("/");
  //       console.log("found user while logging in");
  //     } else {
  //       console.log("not found user while logging in");
  //     }
  //   } else {
  //     console.log("token is not here in login....so please signin");
  //   }
  // };

  return (
    <>
      <LOGINWRAP>
        <LOGINBG>
          <div className="bg-div">
            <IconButton className="login-span">
              <SiTinder className="tinder__logo" />
            </IconButton>
            <p className="login-p">Tinder-by-aman</p>
          </div>
        </LOGINBG>
        <LOGINDIV>
          <div>
            <h1>
              Click the <p>Log-in</p> Button to logged in the{" "}
              <p>Tinder by Aman</p>
            </h1>
            <button onClick={signInFunc}>Sign-In</button>
          </div>
        </LOGINDIV>
      </LOGINWRAP>
    </>
  );
};

export default Login;

const LOGINWRAP = styled.section`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 50px;
  justify-content: center;
  background-color: #cacaca;
  @media (max-width: 700px) {
    gap: 100px;
  }
`;
const LOGINBG = styled.div`
  .bg-div {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .login-span {
      display: grid;
      align-items: center;
      svg {
        width: 70px;
        height: 70px;
        @media (max-width: 700px) {
          width: 50px;
          height: 50px;
        }
      }
    }
    .login-p {
      font-size: 2.1em;
      color: #fff;
      font-weight: 600;
      margin: 0 15px;
      letter-spacing: 0.2px;
      @media (max-width: 700px) {
        font-size: 1.2em;
      }
    }
  }
`;
const LOGINDIV = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 70px;
  background-color: #f6f6f6;
  width: 60%;
  height: 30vh;
  box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.75);
  @media (max-width: 950px) {
    padding: 40px;
  }
  @media (max-width: 730px) {
    padding: 50px 2px;
    width: 95%;
  }
  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  & > div > h1 {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 1em;
    font-weight: 400;
    letter-spacing: 0.5px;
    line-height: 2;
    @media (max-width: 1292px) {
      font-size: 0.86em;
    }
    @media (max-width: 730px) {
      font-size: 0.8em;
    }
  }
  & > div > h1 > p {
    font-size: 0.95em;
    font-weight: 700;
    margin: 0 5px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: grey;
      bottom: 2px;
    }
  }
  & > div > button {
    width: 30%;
    padding: 10px 10px;
    margin: 0 20px;
    margin-top: 50px;
    background-color: #df472c;
    border-radius: 10px;
    color: #ffffff;
    border: none;
    outline: none;
    font-size: 1.03em;
    font-weight: 500;
    letter-spacing: 0.2px;
    cursor: pointer;
    @media (max-width: 1292px) {
      font-size: 1em;
    }
    @media (max-width: 700px) {
      font-size: 0.85em;
      width: 70%;
    }
    &:hover,
    &:active {
      background-color: #f13a1ac0;
    }
  }
`;
