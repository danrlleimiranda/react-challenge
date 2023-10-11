import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";


export type NewsType = {
    id: string;
    titulo: string;
    introducao: string;
    data_publicacao: string;
    imagens: string;
    link: string
}
export type GlobalStateType = {
    news: {
        items: NewsType[]
    }
}

export type Dispatch = ThunkDispatch<GlobalStateType, null, AnyAction>;