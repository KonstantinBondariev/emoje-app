import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import {Emoji} from './components/emoji'
import {DataService} from './services/dataService'
import { Iemoji } from './types/Iemoji';


const dataService = new DataService('/emojiList.json')

function App() {

  const [data, setData] = useState<Iemoji[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermIsShort, setSearchTermIsShort] = useState(true)
  const [searchResults, setSearchResults] = useState<Iemoji[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const responseData: Iemoji[] = await dataService.getData();
      setData(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.length > 3) {
      setSearchTermIsShort(false)
      getFilteredData()
    } else {
      setSearchTermIsShort(true)
    }
  };

  const getFilteredData = async () => {
    try {
      const responseData: Iemoji[] = await dataService.getData();
      const results = responseData.filter(
        (emoji) => emoji.keywords.toLowerCase().includes(searchTerm)
      );
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (   
    <div className='container'>
      <div className='input-block'>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by keywords"
        />
      </div>   

      <h1>Emojies:</h1> 

      {searchTermIsShort && <div>
        <div className='emojies'>
        {data.slice(0,50).map((emoji, index) => (
          <div className='emoji'>
            <h2>{index +1}</h2>
            <Emoji key={index} emoji={emoji} />
          </div>
          ))}
        </div>
      </div>} 

      {!searchTermIsShort && <div>
        <div className='emojies'>
        {searchResults.map((emoji, index) => (
          <div className='emoji'>
            <h2>{index +1}</h2>
            <Emoji key={index} emoji={emoji} />
          </div>
          ))}
        </div>
      </div>}     

   </div>
  )  
}

export default App;
