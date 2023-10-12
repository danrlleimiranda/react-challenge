import { useState } from 'react';
import { useSelector } from 'react-redux';
import { GlobalStateType } from '../types';
import NewsCard from '../components/NewsCard/NewsCard';
import style from '../components/RecentsNews/recentsNews.module.css';

export default function New() {
  const news = useSelector((globalState: GlobalStateType) => globalState.news.items);
  const [quantityNews, setQuantityNews] = useState(6);

  const handleNewsQuantity = () => {
    setQuantityNews((prevQuantity) => prevQuantity + 6);
  };
  return (
    <section className={ style.section }>
      <div className={ style.container }>
        {news && news.filter((item) => item.tipo === 'Notícia')
          .filter((_, i) => i < quantityNews)
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
