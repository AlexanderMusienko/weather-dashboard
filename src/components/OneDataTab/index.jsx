import React from "react";
import { Count } from "reaviz";
import s from "./style.module.css";

export default function OneDataTab({
  header,
  dataValue,
  unitValue,
  icon,
  containerClassName,
}) {
  return (
    <div className={containerClassName}>
      <h6 className={s.header}>{header}</h6>
      <div className={s.mainContent}>
        <span className={s.oneDataValue}>
          <Count className="one-data-value" to={dataValue} /> {unitValue}
        </span>
        <img className={s.bottomIcon} src={icon} alt={header} draggable={false} />
      </div>
    </div>
  );
}
