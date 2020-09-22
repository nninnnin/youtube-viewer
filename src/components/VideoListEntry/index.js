import React from "react";
import styled from "styled-components";

const EntryWrapper = styled.div`
  box-sizing: border-box;

  font-size: 0.5em;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;

  padding: 10px;
  box-shadow: 1px 1px 4px black;
  border-radius: 15px;

  img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  .contents {
    flex-grow: 1;
  }

  .title {
    font-size: 1.7em;
  }

  .publishTime {
    font-weight: bold;
  }
`;

export default function VideoListEntry({ videoData }) {
  return (
    <EntryWrapper>
      <div>
        <img src={videoData.snippet.thumbnails.high.url} alt="" />
      </div>
      <div className="contents">
        <div className="title">{videoData.snippet.title}</div>
        <div>{videoData.snippet.description.slice(0,30) + '...'}</div>
        <div className="publishTime">published at {videoData.snippet.publishTime}</div>
      </div>
    </EntryWrapper>
  );
}
