import React, { useState, useEffect } from "react";
import _ from "lodash";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import AppHeader from "../AppHeader";
import VideoList from "../VideoList";
import VideoPlayer from "../VideoPlayer";
import styled, { createGlobalStyle } from "styled-components";
import Container from "../shared/Container";
import { searchYoutube } from '../../api/youtube';

const UTILITY_VARIABLES = {
  nextPageToken: '',
  scrollableHeight: -Infinity
};

const Main = styled.main`
  margin: 110px 0;
`;


export default function App() {
  const [ searchingResult, setSearchingResult ] = useState([]);
  const [ renderedVideoCounter, setRenderedVideoCounter ] = useState(0);
  const [ selectedVideo, setSelectedVideo ] = useState({});

  const GlobalStyle = createGlobalStyle`
      body {
        ${selectedVideo.id ? 'height: 100vh; overflow-y: hidden;' : ''}
      }
  `;

  useEffect(() => {
    fetchingNewData('');
  }, []);

  useEffect(() => {
    const renderedVideo = document.getElementsByClassName('video-list-wrapper')[0].children;

    if (renderedVideoCounter !== renderedVideo.length) {
      setRenderedVideoCounter(renderedVideo.length);
      console.log(renderedVideo.length + '개의 비디오가 렌더링 되었습니다');
    }
  });

  useEffect(() => {
    // 비디오가 렌더링 될 때 마다 제한선 새로고침
    const main = document.getElementsByTagName('main')[0];

    let mainElementMargin = 0;
    mainElementMargin += parseInt(window.getComputedStyle(main).getPropertyValue('margin-top'));
    mainElementMargin += parseInt(window.getComputedStyle(main).getPropertyValue('margin-bottom'));

    const viewerHeight = window.innerHeight;
    UTILITY_VARIABLES.scrollableHeight = main.offsetHeight + mainElementMargin - viewerHeight;

    // 비디오가 렌더링 될 때 마다 window에 걸린 이벤트리스너를 새고로침 (새로운 디바운스 함수를 실행)
    window.addEventListener('scroll', handleScrolling);

    return () => {
      window.removeEventListener('scroll', handleScrolling); // 얘가 없애주는건 어떤 이벤트 리스너일까?
    }
  }, [renderedVideoCounter]);

  const handleScrolling = (e) => {
    if (window.scrollY >= UTILITY_VARIABLES.scrollableHeight - 50) {
      debouncedFetchingNewData(UTILITY_VARIABLES.nextPageToken);
    }
  };

  const debouncedFetchingNewData = _.debounce(fetchingNewData, 2000, {'leading': true, 'trailing': false});

  async function fetchingNewData(nextPageToken) {
    console.log('펫칭');
    console.log(searchingResult);
    try {
      const result = await searchYoutube({
        maxResults: 10,
        pageToken: nextPageToken
      });
      setSearchingResult(searchingResult.concat(result.items));
      UTILITY_VARIABLES.nextPageToken = result.nextPageToken;
    } catch (err) {
      console.log(err);
    }
  }

  const findVideo = (videoId) => {
    for (let i = 0; i < searchingResult.length; i++) {
      if (searchingResult[i].id.videoId === videoId) {
        setSelectedVideo(searchingResult[i]);
        break;
      }
    }
  }

  return (
    <Router>
      <GlobalStyle />
      <AppHeader updateSearchingResult={(val) => setSearchingResult(val)} />
      <Route path="/">
        <Main>
          <Container>
              <VideoList videoListData={searchingResult} />
          </Container>
        </Main>
      </Route>
      <Route path="/:videoId" >
        {renderedVideoCounter > 0 && <VideoPlayer onMount={findVideo} videoData={selectedVideo} />}
      </Route>
    </Router>
  );
}
