import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NewsType } from '../../types';
import style from './newscard.module.css';
import favoriteIcon from '../../assets/heartFull.svg';
import notFavoriteIcon from '../../assets/heartEmpty.svg';

type NewsCardProps = {
  news: NewsType;
  index: number;
  className: string;
};

export default function NewsCard({ news, index, className }: NewsCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const alreadyInLocalStorage = JSON.parse(
      localStorage.getItem('favoriteNews') || '[]',
    );
    if (alreadyInLocalStorage.some((item: NewsType) => item.id === news.id)) {
      setIsFavorite(true);
    }
  }, []);
  const publishedDaysAgo = () => {
    const dataBrasileira = news.data_publicacao;

    const partesDataHora = dataBrasileira.split(/[\s:/]+/);

    const dataParaComparar = new Date(
      parseInt(partesDataHora[2], 10),
      parseInt(partesDataHora[1], 10) - 1,
      parseInt(partesDataHora[0], 10),
      parseInt(partesDataHora[3], 10),
      parseInt(partesDataHora[4], 10),
      parseInt(partesDataHora[5], 10),
    );

    const dataAtual = new Date();

    const diferencaEmMilissegundos = dataAtual.getTime() - dataParaComparar.getTime();

    const diferencaEmDias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24);

    if (Math.floor(diferencaEmDias) === 0) {
      return 'Hoje';
    }

    if (Math.floor(diferencaEmDias) === 1) {
      return '1 dia atrás';
    }

    if (Math.floor(diferencaEmDias) > 1) {
      return `${Math.floor(diferencaEmDias)} dias atrás`;
    }
  };

  const handleFavorite = () => {
    const alreadyInLocalStorage = JSON.parse(
      localStorage.getItem('favoriteNews') || '[]',
    );
    const favoriteNews = [...alreadyInLocalStorage, news];
    localStorage.setItem('favoriteNews', JSON.stringify(favoriteNews));
    setIsFavorite(true);
    if (alreadyInLocalStorage.some((item: NewsType) => item.id === news.id)) {
      const filteredNews = alreadyInLocalStorage.filter(
        (item: NewsType) => item.id !== news.id,
      );
      setIsFavorite(false);
      localStorage.setItem('favoriteNews', JSON.stringify(filteredNews));
    }
  };

  return (
    <div className={ style[className] }>
      <div className={ style.cardTop }>
        {(index === 0
        ) && <span>Notícia mais recente</span>}
        {(index === 0
        ) && (
          <button onClick={ handleFavorite }>
            {isFavorite
              ? <img src={ favoriteIcon } alt="" />
              : <img src={ notFavoriteIcon } alt="" />}

          </button>)}
      </div>
      <h3>{news.titulo}</h3>
      <p>{news.introducao}</p>
      <div className={ style.cardBottom }>
        <span>{`${publishedDaysAgo()}`}</span>
        <a href={ news.link } target="blank">
          Leia a notícia aqui
        </a>
      </div>
      {(index >= 1) && (
        <button onClick={ handleFavorite } className={ style.bottomBtn }>
          {isFavorite
            ? <img src={ favoriteIcon } alt="" />
            : <img src={ notFavoriteIcon } alt="" />}
        </button>
      ) }

    </div>
  );
}
