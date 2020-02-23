import { useAsyncFunction } from './useAsyncFunction';
import { Game, getGames, setGameStatus } from './gameClientAPI';

const emptyList: Game[] = [];

export const useGames = () => {
  const { value: games, error, isPending, mutate: setGames } = useAsyncFunction(
    'getGames',
    getGames,
    emptyList
  );

  const updateGame = (game: Game) => {
    const index = games.findIndex(g => g.id === game.id);
    if (index >= 0) {
      const gamesCopy = games.slice();
      gamesCopy[index] = game;
      setGames(gamesCopy);
    }
  };
  const markAsFinished = (id: number) => {
    setGameStatus(id, 'finished')
      .then(updateGame)
      .catch(error =>
        alert(
          `There was a problem updating this game.\n` +
            `Please try again later.\n\n` +
            `(${error.toString()})`
        )
      );
  };

  return { games, error, isPending, markAsFinished };
};
