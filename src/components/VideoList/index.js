import React from "react";
import styled from "styled-components";
import VideoListEntry from "../VideoListEntry";

const Wrapper = styled.div`
  display: grid;
  padding: 2em 0 0;
  width: 100%;
  grid-template-columns: repeat(3, minmax(150px, 1fr));
  grid-template-rows: repeat(auto-fit, 1fr);
  column-gap: 20px;
  row-gap: 20px;
`;

export default function VideoList({ videoListData }) {
  console.log(videoListData);
  const videoList = videoListData.map((video) => {
    return <VideoListEntry videoData={video} />
  });

  return (
    <Wrapper className="video-list-wrapper">
      {videoList}
    </Wrapper>
  );
}
