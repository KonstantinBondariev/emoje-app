// import React from "react";
import { Iemojie } from "../types/Iemoji"

interface EmojeProps {
  emoji:Iemojie
}

export function Emoji(props:EmojeProps) {

  const containerStyle = {
    // display: 'flex'
  }

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
    <div >
      <div style={emojiStyle}>{props.emoji.symbol}</div>
      <div style={titleStyle}>{props.emoji.title}</div>
      <div style={keywordsStyle}>{props.emoji.keywords}</div>
    </div>
  );
}