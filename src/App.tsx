import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {Emoji} from './components/emoji'
import {DataService} from './services/dataService'
import { Iemoji } from './types/Iemoji';
import  EmojiForm  from './components/EmojiForm'

const dataService = new DataService()

function App() {

  const [data, setData] = useState<Iemoji[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermIsShort, setSearchTermIsShort] = useState(false)

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const responseData: Iemoji[]= await dataService.getData();
      if(responseData) setData(responseData.reverse()); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.length >= 3) {
      setSearchTermIsShort(false)
      getFilteredData()
    } 
    else {
      getData()
      setSearchTermIsShort(true)
    }
  };

  const getFilteredData = async () => {
    try {
      const results = data.filter(
        (emoji) => emoji.keywords.toLowerCase().includes(searchTerm)
      );
      setData(results);
    } catch (error) {
      console.error(error);
    }
  };

  const removeEmoji =  async (key:string) => {
       try {
      await dataService.deleteData(key); 
      getData(); 
    } catch (error) {
      console.log(error);
    }     
  }; 

  const handleFormSubmit = async (newEmoji:Iemoji) => {
        try {
          await dataService.postData(newEmoji); 
          getData(); 
        } catch (error) {
          console.log(error);
        }   
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
        {searchTermIsShort && <div>
          must be more then 2 symbols
        </div>}
      </div>
      </div>         

      <h1>Emojies:</h1> 

       <div>
        <div className='emojies'>
        {data.slice(0,50).map((emoji, index) => (
          <div className='emoji'>
            <h2>{index +1}</h2>

            <Emoji key={emoji.key} emoji={emoji} />

            <button className='btn' 
                    onClick={() => emoji.key? removeEmoji(emoji.key): null}>
                      Remove
            </button>
          </div>
          ))}
        </div>
      </div>
   </div>
  )  
}

export default App;


