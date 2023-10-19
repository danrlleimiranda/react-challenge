import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type NewsType = {
  id: string;
  titulo: string;
  tipo: string,
  introducao: string;
  data_publicacao: string;
  imagens: string;
  link: string
};
export type GlobalStateType = {
  news: {
    items: NewsType[]
  },
  favorites: NewsType[]
};

export type Dispatch = ThunkDispatch<GlobalStateType, null, AnyAction>;
