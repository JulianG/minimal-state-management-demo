export type Game = {
  id: number;
  title: string;
  year: number;
  genre: string;
  url: string;
  status: 'not-started' | 'in-progress' | 'finished';
  img: string;
};

export const getGames = (): Promise<Game[]> => {
  return fetch('http://localhost:3001/games/').then(response =>
    httpResponseToJSON(response)
  );
};

export const setGameStatus = (id: number, status: Game['status']): Promise<Game> => {
  return fetch('http://localhost:3001/games/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: status })
  }).then(response => httpResponseToJSON(response));
};

function httpResponseToJSON<T>(response: Response): Promise<T> {
  if (response.status !== 200) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}
