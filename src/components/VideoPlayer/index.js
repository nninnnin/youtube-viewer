import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Modal from '../shared/Modal'

const Video = styled.iframe`
  padding: 15px;
  background-color: black;
`;
const VideoInfo = styled.div`
  margin-left: 15px;
  overflow-x: auto;
`;
const Title = styled.h1`
  font-size: 1.5em;
`;
const Description = styled.p`
  background-color: yellogreen;
  font-size: 0.8em;
`;

export default function VideoPlayer ({ onMount }) {
  let videoData;
  const { videoId } = useParams();
  const [ selectedVideo, setSelectedVideo ] = useState({});

  useEffect(() => {
    videoData = onMount(videoId);
    setSelectedVideo(videoData);
  }, []);

  console.log(selectedVideo);

  return (
    <Modal>
      <Video src={`https://www.youtube.com/embed/${selectedVideo.id?.videoId}`}></Video>
      <VideoInfo>
        <Title>{selectedVideo.snippet?.title}</Title>
        <Description>{selectedVideo.snippet?.description}</Description>
      </VideoInfo>
    </Modal>
  );
}
