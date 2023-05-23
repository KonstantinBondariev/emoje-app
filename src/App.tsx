import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {Emoji} from './components/emoji'
import {DataService} from './services/dataService'
import { Iemoji } from './types/Iemoji';
import  EmojiForm  from './components/EmojiForm'

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

  const removeEmoji = (index:number) => {
    const newData = data.filter((_, i) => i !== index);
    console.log(newData);    
    setData(newData);
  }; 

  const handleFormSubmit = (newEmoji:Iemoji) => {
    const newData = [...data];
    newData.unshift(newEmoji);  
    setData(newData);
  };
  
  return (   
    <div className='container'>

    <div>
      <EmojiForm onFormSubmit={handleFormSubmit} />
    </div>

    <hr />

      <div className='search-block'>        
      <div className='input-block'>
        <label className='input-block__label'>Search:</label>
        <input
          className='input-block__input'
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by keywords"
        />
      </div>
      </div>         

      <h1>Emojies:</h1> 

      {searchTermIsShort && <div>
        <div className='emojies'>
        {data.slice(0,50).map((emoji, index) => (
          <div className='emoji'>
            <h2>{index +1}</h2>

            <Emoji key={index} emoji={emoji} />

            <button className='btn' 
                    onClick={() => removeEmoji(index)}>
                      Remove
            </button>
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
