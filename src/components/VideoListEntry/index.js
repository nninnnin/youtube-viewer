import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const EntryWrapper = styled.div`
  box-sizing: border-box;

  font-size: 0.5em;
  width: 100%;
  height: 270px;
  display: flex;
  flex-direction: column;
  transition: 0.2s;

  padding: 10px;
  box-shadow: 1px 1px 4px black;
  border-radius: 15px;

  .title {
    font-size: 1.7em;
  }

  .publishTime {
    align-self: flex-end;
    margin-top: auto;
  }

  :hover{
    transform: scale(1.05);
  }
`;

const Thumbnail = styled.div`
  img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 10px;

    cursor: pointer;
  }
`;

export default function VideoListEntry({ videoData }) {
  return (
    <EntryWrapper>
      <Thumbnail>
        <Link to={`/${videoData.id.videoId}`}><img src={videoData.snippet.thumbnails.high.url}/></Link>
      </Thumbnail>
      <div className="title">{videoData.snippet.title}</div>
      <div>{videoData.snippet.description.slice(0,30) + '...'}</div>
      <div className="publishTime">published at {videoData.snippet.publishTime}</div>
    </EntryWrapper>
  );
}
