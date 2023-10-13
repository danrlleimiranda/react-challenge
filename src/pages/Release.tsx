import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, GlobalStateType } from '../types';
import NewsCard from '../components/NewsCard/NewsCard';
import style from '../components/RecentsNews/recentsNews.module.css';
import { fetchData } from '../redux/actions';

export default function Release() {
  const release = useSelector((globalState: GlobalStateType) => globalState.news.items);
  const [quantityNews, setQuantityNews] = useState(6);
  const dispatch: Dispatch = useDispatch();

  const handleNewsQuantity = () => {
    setQuantityNews((prevQuantity) => prevQuantity + 6);
  };
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  return (
    <section className={ style.section }>
      <div className={ style.container }>
        {release && release.filter((item) => item.tipo === 'Release')
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
