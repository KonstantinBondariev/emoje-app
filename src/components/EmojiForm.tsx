import React, { ReactEventHandler, useState } from 'react';
import { Iemoji } from '../types/Iemoji';
import { IEmojieForm } from '../types/IEmojiForm';

interface IemojiProps {
  onFormSubmit:any
}

function EmojiForm({ onFormSubmit}:IemojiProps) {
  const [title, setTitle] = useState('');
  const [symbol, setSymbol] = useState('');
  const [keywords, setKeywords] = useState('');

  const handleSubmit = (event:any) => {
    event.preventDefault();
    const newEmoji:Iemoji = {
      title,
      symbol,
      keywords,
    };
    onFormSubmit(newEmoji);
    setTitle('');
    setSymbol('');
    setKeywords('');
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
    <h2>Add Emoji</h2>
    <div className='input-block'>
      <label className='input-block__label'>Title:</label>
      <input className='input-block__input'
             type="text" 
             value={title} 
             onChange={(event) => setTitle(event.target.value)} 
             required />
    </div>
    <div className='input-block'>
      <label className='input-block__label'>Symbol:</label>
      <input className='input-block__input' 
             type="text" 
             value={symbol} 
             onChange={(event) => setSymbol(event.target.value)} 
             required />
    </div>
    <div className='input-block'>
      <label className='input-block__label'>Keywords:</label>
      <input className='input-block__input' 
             type="text" value={keywords} 
             onChange={(event) => setKeywords(event.target.value)} 
             required />
    </div>
    <button type="submit" className='btn'>Add</button>
  </form>
  );
}

export default EmojiForm;
