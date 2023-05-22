import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import {Emoji} from './components/emoji'
import {emojies} from './data/emojies'
import {DataService} from './services/dataService'
import { Iemojie } from './types/Iemoji';


const dataService = new DataService('/emojiList.json')

function App() {

  const [data, setData] = useState<Iemojie[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseData: Iemojie[] = await dataService.getData();
      setData(responseData);
    } catch (error) {
      console.error(error);
    }
  };

 
  
  return (   
    <div className='container'>
      <h1>Emojies:</h1>      
      <div className='emojies'>
      {data.slice(0,50).map((emoji, index) => (
        <div className='emoji'>
          <h2>{index +1}</h2>
          <Emoji key={index} emoji={emoji} />
        </div>
      ))}
      </div>
   </div>
  )  
}

export default App;
