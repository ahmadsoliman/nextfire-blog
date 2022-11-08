import React from "react";
import styles from "./Loader.module.scss";

type Props = { show: boolean };

const Loader = ({ show }: Props) => {
  return show ? <div className={styles.loader}></div> : null;
};

export default Loader;
