import React, { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import SendIcon from "@mui/icons-material/Send";
import { db } from "../firebaseConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "../styles/fetchinfo.css";
import { toast } from "react-toast";

const FetchInfo = () => {
  const { initialUser } = useSelector((state) => state.tinderRedux);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [picExtra, setPicExtra] = useState("");
  const [localId, setlLocalId] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");

  useEffect(() => {
    console.log("fetch info renders");
    if (initialUser === null) {
      navigate("/login");
      toast.error("error occurred in Signning In, please try again");
    } else {
      setName(initialUser.name);
      setPic(initialUser.photoUrl);
      setEmail(initialUser.email);
      setlLocalId(initialUser.loginId);
    }
  }, []);

  const addUserToDbFunc = async () => {
    const messageCollectionRef = collection(db, `users`);
    await addDoc(messageCollectionRef, {
      loginId: localId,
      name: name,
      email: email,
      photoDp: pic,
      photoUrl: picExtra,
      age: age,
      occupation: occupation,
      time: serverTimestamp(),
    });
    navigate("/");
    console.log("added user");
    toast.success("User Added Successfully");
  };

  return (
    <>
      <section className="fetchinfo__Section">
        <h1>You have to submit your information for sign-in</h1>
        <form action="" className="fetchinfo__form">
          <TextField
            id="filled-basic"
            className="fetchinfo__inputs"
            label="Enter your Name"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="filled-basic"
            className="fetchinfo__inputs"
            label="Enter your Age"
            variant="standard"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            id="filled-basic"
            className="fetchinfo__inputs"
            label="Enter your Occupation"
            variant="standard"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
          <TextField
            id="filled-basic"
            className="fetchinfo__inputs"
            label="If you want to change,Enter your Profile Image Url"
            variant="standard"
            value={picExtra}
            onChange={(e) => setPicExtra(e.target.value)}
          />
          {/* <Button
            className="fetchinfo__inputs"
            variant="contained"
            component="label"
          >
            Upload Your pic
            <input hidden accept="image/*" multiple type="file" />
          </Button> */}

          <Button
            variant="contained"
            className="fetchinfo__buttons"
            endIcon={<SendIcon />}
            onClick={addUserToDbFunc}
          >
            Submit your Info
          </Button>
        </form>
      </section>
    </>
  );
};

export default FetchInfo;
