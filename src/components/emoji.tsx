import React, {useState} from "react";
import { Iemoji } from "../types/Iemoji"

interface EmojeProps {
  emoji:Iemoji
}

export function Emoji(props:EmojeProps) {

  const [details, setDetails] = useState(false)

  const emojiStyle = {
    fontSize: '24px',
    marginBottom: '8px',
  };

  const titleStyle = {
    fontWeight: 'bold',
    marginBottom: '4px',
  };

  const keywordsStyle = {
    fontStyle: 'italic',
  };

  return (
    <div className="emoji-item">
      <div style={emojiStyle}>{props.emoji.symbol}</div>
      <div style={titleStyle}>{props.emoji.title}</div>

      <button
      className='btn'
      onClick={()=>setDetails(prev => ! prev)}
      style = {!details? {background: "	#4169E1" , color: '#FFDAB9'}:{background: '#FFDAB9', color: '#4169E1'}}
      >
        {!details ? 'Show': 'Hide'}
      </button>

      {details && 
      <div style={keywordsStyle}>
        {props.emoji.keywords}
      </div>}
    </div>
  );
}

