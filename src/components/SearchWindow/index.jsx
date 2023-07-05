import React from "react";
import s from "./style.module.css";
import { motion } from "framer-motion";
import { variants } from "../../constants/framer-motion-variants";

export default function SearchWindow({
  foundedCountriesList,
  onClickFunc,
  onChangeFunc,
  onClickRegion,
}) {
  const jsxFoundedCountries = foundedCountriesList.map((country) => (
    <button
      className={s.regionButton}
      key={country}
      value={country.toLowerCase()}
      onClick={onClickRegion}
    >
      {country}
    </button>
  ));

  return (
    <div className={s.outerWindow}>
      <div className={s.backdrop} onClick={onClickFunc} />
      <motion.div
        variants={variants.searchBar}
        initial={"initial"}
        animate={"animate"}
        exit={"exit"}
        className={s.innerWindow}
      >
        <input
          onChange={onChangeFunc}
          placeholder="Search Your Location"
          type={"search"}
          className={s.input}
          style={{
            marginBottom: jsxFoundedCountries.length === 0 ? "0" : "25px",
          }}
        />
        <div className={s.optionsContainer}>{jsxFoundedCountries}</div>
      </motion.div>
    </div>
  );
}
