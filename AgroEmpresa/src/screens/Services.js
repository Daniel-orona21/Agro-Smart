/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import styles from "./Services.module.css";

const Services = () => {
  return (
    <div name="Services" className={styles.services}>
      <p>.::Aquaphonia & Hidroponia::.</p>
      <img
        className={styles.webImage}
        src={require("../assets/maragro.jpg")}
      ></img>
    </div>
  );
};

export default Services;
