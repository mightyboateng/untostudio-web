import { onValue, push, set } from "firebase/database";
import { queryUserDB, realtimeDb, rtRef } from "./firebase";
import { User } from "firebase/auth";
import { currentUserType } from "@/types/userType";
import { Dispatch } from "@reduxjs/toolkit";
import { store } from "@/redux/store";
import { setUserDetail } from "@/redux/slides/userSlice";
import {
  kSuccessfulMessage,
  kErrorMessage,
  kUserCreatedAlready,
} from "@/utils/constants";

export const addNewUserToRealTimeDb = async (
  userDetail: User,
  dispatch: Dispatch
) => {
  const checkUserExistence: any = await checkIfUserIsCreatedAlready(
    userDetail.uid
  );

  if (checkUserExistence?.length === 0) {
    try {
      const newUserRef = push(rtRef(realtimeDb, "users"));

      const newUserId = newUserRef.key;

      // Save user details realtime database
      await set(rtRef(realtimeDb, `/users/${newUserId}`), {
        uid: userDetail.uid,
        databaseId: newUserId,
        photoUrl: userDetail.photoURL,
        displayName: userDetail.displayName,
        email: userDetail.email,
        userType: "Free",
      });

      // Save user details to local state
      store.dispatch(
        setUserDetail({
          uid: userDetail.uid,
          databaseId: newUserId,
          photoUrl: userDetail.photoURL,
          displayName: userDetail.displayName,
          email: userDetail.email,
          userType: "Free",
        })
      );

      return kSuccessfulMessage;
    } catch (error) {
      console.log("error", error);
      return kErrorMessage;
    }
  } else {
    store.dispatch(
      setUserDetail({
        uid: checkUserExistence[0].uid,
        databaseId: checkUserExistence[0].databaseId,
        photoUrl: checkUserExistence[0].photoURL,
        displayName: checkUserExistence[0].displayName,
        email: checkUserExistence[0].email,
        userType: checkUserExistence[0].userType,
      })
    );
    return kUserCreatedAlready;
  }
};

const checkIfUserIsCreatedAlready = async (userUid: string) => {
  console.log("checking user", userUid);
  return new Promise((resolve) => {
    onValue(
      queryUserDB,
      (snapshot) => {
        if (snapshot.exists()) {
          const keys = Object.values(snapshot.val()).filter(
            (userDetail: any) => userDetail.uid === userUid
          );
          resolve(keys);
        } else {
          // If snapshot doesn't exist, resolve with an empty array
          resolve([]);
        }
      },
      (error) => {
        console.error("Error checking user existence:", error);
        // In case of error, resolve with an empty array
        resolve([]);
      }
    );
  });
};
