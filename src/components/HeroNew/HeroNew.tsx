import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import style from '../RecentsNews/recentsNews.module.css';
import { GlobalStateType } from '../../types';
import NewsCard from '../NewsCard/NewsCard';

export default function HeroNew() {
  const firtsNews = useSelector((globalState: GlobalStateType) => globalState.news.items);
  const image = firtsNews ? JSON.parse(firtsNews[0].imagens) : '';

  if (!firtsNews) {
    return (
      <div
        className={ style.firstNews }
      >
        <BeatLoader color="#36d7b7" />
      </div>
    );
  }

  return (

    <section className={ style.firstNews }>
      <img
        src={ `https://agenciadenoticias.ibge.gov.br/${image.image_intro}` }
        alt="Notícia em destaque"
        className={ style.hero }
      />

      {firtsNews && (
        <NewsCard news={ firtsNews[0] } index={ 0 } className="cardFirstNews" />
      )}

    </section>

  );
}
