import React, { useEffect } from "react";
import { Dispatch, GlobalStateType, NewsType } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../redux/actions";
import NewsCard from "../NewsCard/NewsCard";

export default function () {
  const dispatch: Dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  const IBGE_news = useSelector(
    (globalState: GlobalStateType) => globalState.news.items
  );

  return (
    <div>
      {IBGE_news &&
        IBGE_news.map((news: NewsType, index) => (
          <NewsCard key={index} news={news} index={index} />
        ))}
    </div>
  );
}
