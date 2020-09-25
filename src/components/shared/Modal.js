import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh; overflow-y: hidden;
  }
`;
const Overlay = styled.div`
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

export default function Modal ({ children }) {
  return (
    <>
      <GlobalStyle />
      <Link to="/">
          <Overlay>
          </Overlay>
      </Link>
      <ModalContent>
        { children }
      </ModalContent>
    </>
  );
}