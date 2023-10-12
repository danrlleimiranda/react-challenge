import { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard/NewsCard';
import style from '../components/RecentsNews/recentsNews.module.css';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritesStorage = localStorage.getItem('favoriteNews') || '[]';
    setFavorites(JSON.parse(favoritesStorage));
  }, []);
  const [quantityNews, setQuantityNews] = useState(6);

  const handleNewsQuantity = () => {
    setQuantityNews((prevQuantity) => prevQuantity + 6);
  };

  if (favorites.length === 0) return (<h1>Nenhuma Notícia favoritada!</h1>);
  return (
    <section className={ style.section }>
      <div className={ style.container }>
        {favorites && favorites.filter((_, i) => i < quantityNews)
          .map((item, index) => (
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
