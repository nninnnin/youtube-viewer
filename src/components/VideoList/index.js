import React from "react";
import styled from "styled-components";
import VideoListEntry from "../VideoListEntry";

const Wrapper = styled.div`
  display: grid;
  padding: 2em 0 0;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-template-rows: 200px 200px 200px;
  column-gap: 20px;
  row-gap: 20px;
`;

export default function VideoList({ videoListData }) {
  console.log(videoListData);
  const videoList = videoListData.map((video) => {
    return <VideoListEntry videoData={video} key={video.etag} />
  });

  return (
    <Wrapper>
      {videoList}
    </Wrapper>
  );
}
