import React, { useEffect } from "react";
import { authService, dbService } from "fbase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const Profile = ({ userObj }) => {
  const onLogOutClick = () => authService.signOut();
  const getMyNweets = async () => {
    const q = query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
