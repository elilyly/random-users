import React, {useEffect, useState} from 'react';


const LikeButton = ({userId, onClick, likes}) => {
  return (
    <div>
      <button onClick={onClick} id={userId}>Likes: {likes}</button>
    </div>
  )
}

export default LikeButton;
