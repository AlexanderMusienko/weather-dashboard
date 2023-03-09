import React from "react";
import searchIcon from "../icons/search.svg";

export default function SearchButton(props) {
  return (
      <button
        className={"button"}
        onClick={props.onClickFunc}
        style={{ display: "flex", justifyContent: "center", alignItems: "center"}}
      >
        <img alt="search" src={searchIcon} style={{ width: "45%" }} />
      </button>
  );
}
