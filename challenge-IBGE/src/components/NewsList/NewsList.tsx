import React, { useEffect } from "react";
import { Dispatch, GlobalStateType, NewsType } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/actions";
import NewsCard from "../NewsCard/NewsCard";
import style from "./newslist.module.css";

export default function () {
  const dispatch: Dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  const IBGE_news = useSelector(
    (globalState: GlobalStateType) => globalState.news.items
  );

  const image = JSON.parse(IBGE_news[0].imagens);

  return (
    <div>
      <div className={style.firstNews}>
        <img
          src={`https://agenciadenoticias.ibge.gov.br/${image.image_intro}`}
          alt=""
        />
        {IBGE_news && <NewsCard news={IBGE_news[0]} index={0} />}
      </div>
      <div className={style.container}>
        {IBGE_news &&
          IBGE_news.filter((_, index) => index > 0).map(
            (news: NewsType, index) => (
              <NewsCard key={index} news={news} index={index + 1} />
            )
          )}
      </div>
    </div>
  );
}
