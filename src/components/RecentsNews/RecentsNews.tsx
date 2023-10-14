import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, GlobalStateType, NewsType } from '../../types';
import { fetchData } from '../../redux/actions';
import NewsCard from '../NewsCard/NewsCard';
import style from './recentsNews.module.css';

export default function RecentsNews() {
  const ibgeNews = useSelector(
    (globalState: GlobalStateType) => globalState.news.items,
  );

  const dispatch: Dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const [quantityNews, setQuantityNews] = useState(7);

  const handleNewsQuantity = () => {
    setQuantityNews((prevQuantity) => prevQuantity + 6);
  };

  return (
    <section className={ style.section }>
      <div className={ style.container }>
        {ibgeNews
          && ibgeNews.filter((_, index) => index > 0 && index < quantityNews).map(
            (news: NewsType, index) => (
              <NewsCard
                key={ index }
                news={ news }
                index={ index + 1 }
                className="card"
              />
            ),
          )}
        <div className={ style.showMore }>

          <button onClick={ handleNewsQuantity }>
            Mais notícias
          </button>
        </div>
      </div>
    </section>
  );
}
