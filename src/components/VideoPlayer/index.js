import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
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

export default function VideoPlayer ({ onMount, videoData }) {
  const { videoId } = useParams();

  useEffect(() => {
    onMount(videoId);
  }, []);

  return (
    <Modal>
      <Video src={`https://www.youtube.com/embed/${videoData.id?.videoId}`}></Video>
      <VideoInfo>
        <Title>{videoData.snippet?.title}</Title>
        <Description>{videoData.snippet?.description}</Description>
      </VideoInfo>
    </Modal>
  );
}
