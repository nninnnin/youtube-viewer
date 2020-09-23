import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Modal = styled.div`
  width: 100%;
  height: 100%;
  `;
const ModalContent = styled.div`
position: fixed;
z-index: 100;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color: pink;
`;
const Title = styled.h1`
  color: red;
`;
const Video = styled.iframe`
  padding: 1em;
`
const Description = styled.p`
  background-color: yellogreen;
`;

export default function VideoPlayer ({ onMount, videoData }) {
  const { videoId } = useParams();

  useEffect(() => {
    console.log(videoId);
    onMount(videoId);
  }, []);

  return (
    <Link to="/">
      <Modal>
        <ModalContent>
          <Title>{videoData.snippet?.title}</Title>
          <Video src={`https://www.youtube.com/embed/${videoData.id?.videoId}`}></Video>
          <Description>{videoData.snippet?.description}</Description>
        </ModalContent>
      </Modal>
    </Link>
  );
}
