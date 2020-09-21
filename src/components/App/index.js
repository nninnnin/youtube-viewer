import React, { useState, useEffect } from "react";
import VideoList from "../VideoList";
import AppHeader from "../AppHeader";
import styled from "styled-components";
import Container from "../shared/Container";
import { searchYoutube } from '../../api/youtube';

const Main = styled.main`
  margin-top: 110px;
`;

export default function App() {
  const [ searchingResult, setSearchingResult ] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const result = await searchYoutube({
          maxResults: 10,
        });
        console.log(result);
        setSearchingResult(result.items);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <AppHeader updateSearchingResult={(val) => setSearchingResult(val)} />
      <Main>
        <Container>
          <VideoList videoListData={searchingResult} />
        </Container>
      </Main>
    </>
  );
}
