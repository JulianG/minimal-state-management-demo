import { useAsyncFunction } from './useAsyncFunction';

export type Game = {
  id: number;
  title: string;
  year: number;
  genre: string;
  url: string;
  status: 'not-started' | 'in-progress' | 'finished';
  img: string;
};

const emptyList: Game[] = [];

const getGames = (): Promise<Game[]> => {
  return fetch('http://localhost:3001/games/').then(response => {
    if (response.status !== 200) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
  });
};

export const setGameStatus = (id: number, status: Game['status']): Promise<Game> => {
  return fetch('http://localhost:3001/games/' + id, {
    method: 'PATCH',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: status })
  }).then(response => response.json());
};

export const useGames = () => {
  const [games, error, isPending] = useAsyncFunction(getGames, emptyList);

  const markAsFinished = (id: number) => {
    setGameStatus(id, 'finished');
  };

  return { games, error, isPending, markAsFinished };
};
