import { Iemoji } from '../types/Iemoji';

export class DataService {
  constructor(private url: string) {}

  getData(): Promise<Iemoji[]> {
    return fetch(this.url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
