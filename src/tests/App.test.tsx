import { screen } from '@testing-library/dom';
import { afterEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import renderWithRouterAndRedux from './helpers/renderWith';
import App from '../App';

afterEach(() => {
  vi.clearAllMocks();
});

const mockedAPI = {
  count: 5455,
  page: 1,
  totalPages: 55,
  nextPage: 2,
  previousPage: 0,
  showingFrom: 1,
  showingTo: 100,
  items: [
    {
      id: 38135,
      tipo: 'Notícia',
      titulo: 'IBGE estará presente na edição de Porto Alegre (RS) da Caravana Federativa',
      introducao: 'O IBGE participará, nos dias 19 e 20 de outubro, da Caravana Federativa, no Centro de Eventos FIERGS, da Federação das Indústrias do Estado do Rio Grande do Sul, em Porto Alegre (RS). Com palestras e oficinas apresentadas por representantes de diversos...',
      data_publicacao: '17/10/2023 15:17:46',
      produto_id: 0,
      produtos: '',
      editorias: 'ibge',
      imagens: '{"image_intro":"images\\/agenciadenoticias\\/ibge\\/2023_10\\/caravana-rs-home.jpg","float_intro":"","image_intro_alt":"","image_intro_caption":"","image_fulltext":"images\\/agenciadenoticias\\/ibge\\/2023_10\\/caravana-rs-home.jpg","float_fulltext":"","image_fulltext_alt":"","image_fulltext_caption":""}',
      produtos_relacionados: '',
      destaque: true,
      link: 'http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/38135-ibge-estara-presente-na-edicao-de-porto-alegre-rs-da-caravana-federativa.html',
    },
    {
      id: 38126,
      tipo: 'Notícia',
      titulo: 'Serviços recuam 0,9% em agosto, após três altas consecutivas ',
      introducao: 'Gestão de portos e terminais exerceu a principal influência negativa sobre o resultado do setor de serviços no país. Foto: Licia Rubinstein/Agência IBGE Notícias Em agosto, o volume de serviços prestados no país recuou 0,9% frente ao mês anterior, após...',
      data_publicacao: '17/10/2023 09:00:00',
      produto_id: 9229,
      produtos: '9229|Pesquisa Mensal de Serviços|pesquisa-mensal-de-servicos|2076',
      editorias: 'economicas',
      imagens: '{"image_intro":"images\\/agenciadenoticias\\/estatisticas_economicas\\/2023_10\\/PMS-THUMB_LiciaR.jpg","float_intro":"","image_intro_alt":"","image_intro_caption":"","image_fulltext":"images\\/agenciadenoticias\\/estatisticas_economicas\\/2023_10\\/PMS-HOME_LiciaR.jpg","float_fulltext":"","image_fulltext_alt":"","image_fulltext_caption":""}',
      produtos_relacionados: '9229',
      destaque: true,
      link: 'http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/38126-servicos-recuam-0-9-em-agosto-apos-tres-altas-consecutivas.html',
    },
    {
      id: 38125,
      tipo: 'Release',
      titulo: 'Volume dos Serviços recua 0,9% em agosto',
      introducao: 'Em agosto de 2023, o volume de serviços no Brasil caiu 0,9% frente a julho, na série com ajuste sazonal, após ter acumulado um ganho de 2,1% no período maio-julho. O setor de serviços está 11,6% acima do nível de fevereiro de 2020 (pré-pandemia) e 1,9%...',
      data_publicacao: '17/10/2023 09:00:00',
      produto_id: 9229,
      produtos: '9229|Pesquisa Mensal de Serviços|pesquisa-mensal-de-servicos|2076',
      editorias: 'economicas',
      imagens: '{"image_intro":"images\\/agenciadenoticias\\/releases\\/PMS_Release.png","float_intro":"","image_intro_alt":"","image_intro_caption":"","image_fulltext":"images\\/agenciadenoticias\\/releases\\/PMS_Release.png","float_fulltext":"","image_fulltext_alt":"","image_fulltext_caption":""}',
      produtos_relacionados: '9229',
      destaque: true,
      link: 'http://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/38125-volume-dos-servicos-recua-0-9-em-agosto.html',
    }] };

const MOCK_RESPONSE = {
  json: async () => mockedAPI,
} as Response;

const globalState = {
  news: mockedAPI,
};

vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

describe('Verifica o funcionamento da aplicação', () => {
  test('Verifica se o Header está sendo visível', () => {
    renderWithRouterAndRedux(<App />);

    const title = screen.getByRole('heading', {
      name: /trybe news/i,
    });

    const logo = screen.getByRole('img', {
      name: /heading-logo/i,
    });

    const moreNews = screen.getByRole('button', {
      name: /mais notícias/i,
    });

    expect(title).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(moreNews).toBeInTheDocument();
  });

  test('Verifica se as notícias estão sendo renderizadas', async () => {
    renderWithRouterAndRedux(<App />, '/', globalState);

    const news = await screen.findByRole('heading', {
      name: /ibge estará presente na edição de porto alegre \(rs\) da caravana federativa/i,
    });

    const heroImg = await screen.findByRole('img', {
      name: /notícia em destaque/i,
    });
    expect(news).toBeInTheDocument();
    expect(heroImg).toBeInTheDocument();
  });

  test('Verifica se ao clicar para favoritar uma notícia ela pode se encontrada na página de favoritos', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/', globalState);

    const favoriteButton = await screen.findAllByAltText(/notícia não favoritada/i);
    await user.click(favoriteButton[1]);
    const favorites = screen.getByRole('link', {
      name: /favoritos/i,
    });
    await user.click(favorites);
    expect(window.location.pathname).toBe('/favorites');

    expect(screen.getByRole('heading', {
      name: /serviços recuam 0,9% em agosto, após três altas consecutivas/i,
    })).toBeInTheDocument();
  });

  test('Verifica se o filtro Release é aplicado corretamente', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/', globalState);

    await user.click(screen.getByRole('link', {
      name: /release/i,
    }));

    expect(window.location.pathname).toBe('/release');
    const release = await screen.findByRole('heading', {
      name: /volume dos serviços recua 0,9% em agosto/i,
    });

    const news = screen.queryByRole('heading', {
      name: /Serviços recuam 0,9% em agosto, após três altas consecutivas/i,
    });

    expect(release).toBeInTheDocument();
    expect(news).not.toBeInTheDocument();
  });

  test('Verifica se o filtro notícia é aplicado corretamente', async () => {
    const { user } = renderWithRouterAndRedux(<App />, '/', globalState);

    await user.click(screen.getAllByRole('link', {
      name: /notícia/i,
    })[1]);

    expect(window.location.pathname).toBe('/new');
    expect(screen.getByRole('heading', {
      name: /serviços recuam 0,9% em agosto, após três altas consecutivas/i,
    })).toBeInTheDocument();

    expect(screen.queryByRole('heading', {
      name: /volume dos serviços recua 0,9% em agosto/i,
    })).not.toBeInTheDocument();
  });
});
