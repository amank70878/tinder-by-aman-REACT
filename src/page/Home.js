import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import UndoIcon from "@mui/icons-material/Undo";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TinderCard from "react-tinder-card";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { collection, query, getDocs, where } from "@firebase/firestore";
import { db } from "../firebaseConfig";
import "../styles/home.css";
import Login from "./Login";
import { toast } from "react-toast";

function Home() {
  // handling user and posts
  const navigate = useNavigate();
  const [fetchedUsersPosts, setFetchedUsersPosts] = useState([]);
  const [fetchedUser, setfetchedUser] = useState([]);

  useEffect(() => {
    toast.success("page load Successfully");
    const _tokenId = localStorage.getItem("tinder-by-aman-id");
    const fetchUserByLocalToken = async () => {
      if (_tokenId) {
        console.log("token is here now searching for user... in home");
        const msgDataCollectionRef = collection(db, `users`);
        const q = query(
          msgDataCollectionRef,
          where("loginId", "==", `${_tokenId}`)
        );
        const docSnap = await getDocs(q);
        console.log(`docSnap is ${docSnap}`);
        if (docSnap._snapshot.docs.size > 0) {
          setfetchedUser(
            docSnap.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          );
          console.log("found user in home");
        } else {
          console.log("user not found in home....sending to login");
          navigate("login/");
        }
      } else {
        console.log("token is not here in home...now sending to login");
        navigate("login/");
      }
    };

    const fetchAllUserPosts = async () => {
      const msgDataCollectionRef = collection(db, `users`);
      const q = query(msgDataCollectionRef);
      const result = await getDocs(q);
      setDbLocal(result._snapshot.docs.size);
      setFetchedUsersPosts(
        result.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    fetchUserByLocalToken();
    fetchAllUserPosts();
  }, []);

  // handling tinder cards here
  const [currentName, setCurrentName] = useState("");
  const [dbLocal, setDbLocal] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(dbLocal - 1);
  const [lastDirection, setLastDirection] = useState("");
  const currentIndexRef = useRef(currentIndex);
  const canGoBack = currentIndex < dbLocal - 1;
  const canSwipe = currentIndex >= 0;
  const childRefs = useMemo(
    () =>
      Array(dbLocal)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );
  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };
  const swiped = (direction, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };
  const outOfFrame = (name, idx) => {
    setCurrentName(name);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };
  const swipe = async (dir) => {
    console.log(canSwipe);
    console.log(currentIndex);
    console.log(dbLocal);
    if (canSwipe && currentIndex < dbLocal) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
    console.log(newIndex);
  };

  return (
    <>
      {fetchedUser ? (
        <section className="home__Section">
          <Header Icon={Avatar} href="me/" />
          <div className="homebody__section">
            <div className="cardContainer">
              {fetchedUsersPosts.map((character, index) => (
                <TinderCard
                  ref={childRefs[index]}
                  className="swipe"
                  key={character.loginId}
                  preventSwipe={("up", "down")}
                  onSwipe={(dir) => swiped(dir, index)}
                  onCardLeftScreen={() => outOfFrame(character.name, index)}
                >
                  <div
                    style={{
                      backgroundImage:
                        "url(" +
                        (character.photoUrl
                          ? character.photoUrl
                          : character.photoDp) +
                        ")",
                    }}
                    className="card"
                  >
                    <div className="card__info">
                      <h3>
                        {character.name} ({character.age})
                      </h3>
                      <p>{character.occupation}</p>
                    </div>
                  </div>
                </TinderCard>
              ))}
            </div>
            {lastDirection ? (
              <h2 key={lastDirection} className="infoText">
                {currentName &&
                  (lastDirection === "left" ? "you dislike " : "you like") +
                    " on " +
                    currentName}
              </h2>
            ) : (
              <h2 className="infoText">Welcome to tinder Clone</h2>
            )}
          </div>
          <div className="buttonsDiv">
            <IconButton
              onClick={() => swipe("left")}
              className="swipeButtons btn1"
            >
              <CloseIcon className="swipe1" />
            </IconButton>
            <IconButton onClick={() => goBack()} className="swipeButtons btn2">
              <UndoIcon className="swipe2" />
            </IconButton>
            <IconButton
              onClick={() => swipe("right")}
              className="swipeButtons btn3"
            >
              <FavoriteIcon className="swipe3" />
            </IconButton>
          </div>
        </section>
      ) : (
        <Login />
      )}
    </>
  );
}

export default Home;
