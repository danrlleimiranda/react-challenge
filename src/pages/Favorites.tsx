import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import NewsCard from '../components/NewsCard/NewsCard';
import style from '../components/RecentsNews/recentsNews.module.css';
import { Dispatch, NewsType } from '../types';
import { fetchData } from '../redux/actions';

export default function Favorites() {
  const favoritesStorage = localStorage.getItem('favoriteNews') || '[]';
  const [favorites, setFavorites] = useState(JSON.parse(favoritesStorage));
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    const favoritesInStorage = localStorage.getItem('favoriteNews') || '[]';
    setFavorites(JSON.parse(favoritesInStorage));
    dispatch(fetchData());
  }, []);

  const [quantityNews, setQuantityNews] = useState(6);

  const handleNewsQuantity = () => {
    setQuantityNews((prevQuantity) => prevQuantity + 6);
  };

  if (favorites.length === 0) {
    return (
      <h1 className={ style.nothingHere }>
        Nenhuma Notícia favoritada!
      </h1>
    );
  }
  return (
    <section className={ style.section }>
      <div className={ style.container }>
        {favorites && favorites.filter((_: NewsType, i: number) => i < quantityNews)
          .map((item: NewsType, index: number) => (
            <NewsCard key={ index } news={ item } index={ index + 1 } className="card" />
          ))}
      </div>
      <div className={ style.showMore }>
        <button onClick={ handleNewsQuantity }>
          Mais notícias
        </button>
      </div>

    </section>
  );
}
