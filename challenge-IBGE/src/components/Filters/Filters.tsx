import React from "react";
import style from "./filters.module.css";

export default function Filters() {
  return (
    <div className={style.filters}>
      <button>Mais recentes</button>
      <button>Release</button>
      <button>Notícia</button>
      <button>Favoritos</button>
    </div>
  );
}
