import React, { useEffect } from "react";
import styled from "styled-components";
import VideoListEntry from "../VideoListEntry";
import MoreVideos from '../MoreVideos';

const Wrapper = styled.div`
  display: grid;
  padding: 2em 0 0;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(150px, 1fr));
  column-gap: 10px;
  row-gap: 20px;
`;

export default function VideoList({ videoListData, fetchNewData }) {
  const videoList = videoListData.map((video) => {
    return <VideoListEntry videoData={video} key={video.etag} />
  });

  return (
    <Wrapper className="video-list-wrapper">
      {videoList}
      { (videoList.length >= 10 && videoList.length < 20) &&
        <MoreVideos fetchNewData={fetchNewData} />
      }
    </Wrapper>
  );
}
