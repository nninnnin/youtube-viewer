import React from "react";
import styled from "styled-components";

const EntryWrapper = styled.div`
  font-size: 0.5em;
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
  }

  .contents {
    flex-grow: 1;
  }
`;

export default function VideoListEntry({ videoData }) {
  return (
    <EntryWrapper>
      <div>
        <img src={videoData.snippet.thumbnails.high.url} alt="" />
      </div>
      <div className="contents">
        <div>{videoData.snippet.title}</div>
        <div>{videoData.snippet.description.slice(0,30) + '...'}</div>
      </div>
    </EntryWrapper>
  );
}
