import React from "react";
import ImmovablesCards from "../components/Immovables/ImmovablesCards";
import InfoAbout from "../components/InfoAbout/InfoAbout";
import Comment from "../components/Comments/Comment";

const Main = () => {
  return (
    <>
      <InfoAbout />
      <ImmovablesCards />
      <Comment/>
    </>
  );
};

export default Main;
