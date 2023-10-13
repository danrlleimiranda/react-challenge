import { useSelector } from 'react-redux';
import style from '../RecentsNews/recentsNews.module.css';
import { GlobalStateType } from '../../types';
import NewsCard from '../NewsCard/NewsCard';

export default function HeroNew() {
  const firtsNews = useSelector((globalState: GlobalStateType) => globalState.news.items);
  const image = firtsNews ? JSON.parse(firtsNews[0].imagens) : '';

  return (

    <section className={ style.firstNews }>
      <img
        src={ `https://agenciadenoticias.ibge.gov.br/${image.image_intro}` }
        alt=""
        className={ style.hero }
      />

      {firtsNews && (
        <NewsCard news={ firtsNews[0] } index={ 0 } className="cardFirstNews" />
      )}

    </section>

  );
}
