import { useAsyncFunction } from './useAsyncFunction';

const getGames = (): Promise<Game[]> => {
  return fetch('http://localhost:3001/games/').then(response => response.json());
};

type Game = {
  id: number;
  title: string;
  year: number;
  genre: string;
  url: string;
  status: 'not-started' | 'in-progress' | 'finished';
  img: string;
};

const emptyList: Game[] = [];

export const useGames = () => {
  const [games] = useAsyncFunction(getGames, emptyList);
  return games;
};
