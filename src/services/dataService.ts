import { Iemoji } from '../types/Iemoji';

const urlFireBase: string =
  'https://emoji-b4501-default-rtdb.europe-west1.firebasedatabase.app/';

export class DataService {
  constructor() {}

  getData(): Promise<Iemoji[] | any> {
    return fetch(`${urlFireBase}/.json`)
      .then((response) => response.json())
      .then((data) => {
        const arr: Iemoji[] = [];
        Object.keys(data).forEach((key) => {
          arr.push({ key, ...data[key] });
        });
        return arr;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  postData(data: Iemoji): Promise<void> {
    return fetch(`${urlFireBase}.json`, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => console.log(response))
      .catch((error) => {
        console.error(error);
      });
  }

  deleteData(key: string): Promise<void> {
    return fetch(`${urlFireBase}${key}.json`, {
      method: 'DELETE',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => console.log(response))
      .catch((error) => {
        console.error(error);
      });
  }
}
