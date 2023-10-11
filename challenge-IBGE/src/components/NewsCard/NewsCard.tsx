import { NewsType } from "../../types";
import style from "./newscard.module.css";

type NewsCardProps = {
  news: NewsType;
  index: number;
};

export default function NewsCard({ news, index }: NewsCardProps) {
  const publishedDaysAgo = () => {
    const dataBrasileira = news.data_publicacao;

    const partesDataHora = dataBrasileira.split(/[\s:/]+/);

    const dataParaComparar = new Date(
      parseInt(partesDataHora[2], 10),
      parseInt(partesDataHora[1], 10) - 1,
      parseInt(partesDataHora[0], 10),
      parseInt(partesDataHora[3], 10),
      parseInt(partesDataHora[4], 10),
      parseInt(partesDataHora[5], 10)
    );

    const dataAtual = new Date();

    const diferencaEmMilissegundos =
      dataAtual.getTime() - dataParaComparar.getTime();

    const diferencaEmDias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24);

    if (Math.floor(diferencaEmDias) === 0) {
      return "Hoje";
    }

    if (Math.floor(diferencaEmDias) === 1) {
      return "1 dia atrás";
    }

    if (Math.floor(diferencaEmDias) > 1) {
      return `${Math.floor(diferencaEmDias)} dias atrás`;
    }
  };

  const handleFavorite = () => {
    const alreadyInLocalStorage = JSON.parse(
      localStorage.getItem("favoriteNews") || "[]"
    );
    const favoriteNews = [...alreadyInLocalStorage, news];
    localStorage.setItem("favoriteNews", JSON.stringify(favoriteNews));

    if (alreadyInLocalStorage.some((item: NewsType) => item.id === news.id)) {
      const filteredNews = alreadyInLocalStorage.filter(
        (item: NewsType) => item.id !== news.id
      );
      localStorage.setItem("favoriteNews", JSON.stringify(filteredNews));
    }
  };

  return (
    <div className={style.card}>
      <div className={style.cardTop}>
        {index === 0 && <span>Notícia mais recente</span>}
        {index === 0 && <button onClick={handleFavorite}>Favoritar</button>}
      </div>
      <h3>{news.titulo}</h3>

      <p>{news.introducao}</p>
      <div className={style.cardBottom}>
        <span>{`${publishedDaysAgo()}`}</span>
        <a href={news.link} target="blank">
          Leia a notícia aqui
        </a>
      </div>
      {index >= 1 && (
        <button onClick={handleFavorite} className={style.bottomBtn}>
          Favoritar
        </button>
      )}
    </div>
  );
}
