import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

const Modal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  background-color: black;
  opacity: 0.5;
  cursor: auto;
  `;
const ModalContent = styled.div`
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width:80%;
  max-width: 650px;
  min-height: 30%;
  background-color: white;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 2px 2px 4px black;

  display: flex;
`;
const Video = styled.iframe`
  padding: 15px;
  background-color: black;
`
const VideoInfo = styled.div`
  margin-left: 15px;
  overflow-x: auto;
`
const Title = styled.h1`
  font-size: 1.5em;
`;
const Description = styled.p`
  background-color: yellogreen;
  font-size: 0.8em;
`;

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh; overflow-y: hidden;
  }
`;

export default function VideoPlayer ({ onMount, videoData }) {
  const { videoId } = useParams();

  useEffect(() => {
    onMount(videoId);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Link to="/">
        <Modal>
        </Modal>
      </Link>
      <ModalContent>
        <Video src={`https://www.youtube.com/embed/${videoData.id?.videoId}`}></Video>
        <VideoInfo>
          <Title>{videoData.snippet?.title}</Title>
          <Description>{videoData.snippet?.description}</Description>
        </VideoInfo>
      </ModalContent>
    </>
  );
}
