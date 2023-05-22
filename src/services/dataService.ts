import { Iemojie } from '../types/Iemoji';

export class DataService {
  constructor(private url: string) {}

  getData(): Promise<Iemojie[]> {
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
