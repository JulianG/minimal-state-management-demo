import React from 'react';
import { useAsyncFunction } from './useAsyncFunction';
import { Game, getGames, setGameStatus } from './gameClientAPI';

const emptyList: Game[] = [];

const useFetchedGames = () => {
  const [fetchedGames, error, isPending] = useAsyncFunction(getGames, emptyList);

  const [games, setGames] = React.useState(emptyList);
  React.useEffect(() => {
    setGames(fetchedGames);
  }, [fetchedGames]);

  return { games, setGames, error, isPending };
};

export const useGames = () => {
  const { games, error, isPending, setGames } = useFetchedGames();

  const updateGame = (game: Game) => {
    const index = games.findIndex(g => g.id === game.id);
    if (index >= 0) {
      const gamesCopy = games.slice();
      gamesCopy[index] = game;
      setGames(gamesCopy);
    }
  };
  const markAsFinished = (id: number) => {
    setGameStatus(id, 'finished').then(updateGame);
  };

  return { games, error, isPending, markAsFinished };
};
