import React from "react";
import searchIcon from "@icons/search.svg";
import s from "./style.module.css";

export default function SearchButton(props) {
  return (
    <button className={s.searchButton} onClick={props.onClickFunc}>
      <img alt="search" src={searchIcon} className={s.buttonIcon} />
    </button>
  );
}
