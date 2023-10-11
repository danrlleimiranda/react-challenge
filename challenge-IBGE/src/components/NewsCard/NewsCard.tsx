import React from "react";
import { NewsType } from "../../types";

type NewsCardProps = {
  news: NewsType;
  index: number;
};

export default function NewsCard({ news, index }: NewsCardProps) {
  const image = JSON.parse(news.imagens);
  return (
    <>
      <h3>{news.titulo}</h3>
      {index === 0 && (
        <img
          src={`https://agenciadenoticias.ibge.gov.br/${image.image_intro}`}
          alt=""
        />
      )}
      <p>{news.introducao}</p>
      <a href={news.link} target="blank">
        Leia a notícia aqui
      </a>
    </>
  );
}
