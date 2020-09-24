import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  @import url('https://fonts.googleapis.com/css2?family=Peddana&display=swap');

  box-sizing: border-box;
  font-family: 'Peddana', serif;
  font-size: 0.5em;
  width: 100%;
  height: 270px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.2s;

  padding: 10px;
  box-shadow: 1px 1px 4px black;
  border-radius: 15px;
  color: white;
  background-color: black;
  font-size: 1em;

  img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 10px;

    cursor: pointer;
  }

  :hover{
    transform: scale(1.05);
  }
`;

export default function MoreVideos ({ fetchNewData }) {
  return (
    <Button onClick={fetchNewData}>
      click here<br/>
      if you wanna see<br/>
      more videos..
    </Button>
  );
}