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
  scrollableHeight: -Infinity,
  latestSearchedKeyword: ''
};

const Main = styled.main`
  margin: 110px 0;
`;

export default function App() {
  const [ searchingResult, setSearchingResult ] = useState([]);
  const [ renderedVideoCounter, setRenderedVideoCounter ] = useState(0);
  const [ selectedVideo, setSelectedVideo ] = useState({});

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
    window.addEventListener('scroll', handleScrolling);

    return () => {
      window.removeEventListener('scroll', handleScrolling);
    }
  }, [renderedVideoCounter]);

  const handleScrolling = (e) => {
    if (shouldFetchNewData()) {
      debouncedFetchingNewData(UTILITY_VARIABLES.nextPageToken, UTILITY_VARIABLES.latestSearchedKeyword);
    }
  };

  function shouldFetchNewData () {
    const currentPosition = window.scrollY;

    const main = document.getElementsByTagName('main')[0];

    let mainElementMargin = 0;
    mainElementMargin += parseInt(window.getComputedStyle(main).getPropertyValue('margin-top'));
    mainElementMargin += parseInt(window.getComputedStyle(main).getPropertyValue('margin-bottom'));

    const viewerHeight = window.innerHeight;
    const finiteLine = main.offsetHeight + mainElementMargin - viewerHeight - 50;

    console.log(currentPosition, finiteLine);

    return Boolean(finiteLine - currentPosition <= 0);
  }

  const debouncedFetchingNewData = _.debounce(fetchingNewData, 2000, {'leading': true, 'trailing': false});
  const debouncedFetchingNewData_trailing = _.debounce(fetchingNewData, 2000, {'leading': false, 'trailing': true});

  async function fetchingNewData(nextPageToken, keyword='') {
    console.log('펫칭');
    try {
      const result = await searchYoutube({
        q: keyword,
        maxResults: 10,
        pageToken: nextPageToken,
        type: "video"
      });

      if (keyword !== UTILITY_VARIABLES.latestSearchedKeyword) {
        setSearchingResult(result.items);
      } else {
        setSearchingResult(searchingResult.concat(result.items));
      }

      UTILITY_VARIABLES.nextPageToken = result.nextPageToken;
      UTILITY_VARIABLES.latestSearchedKeyword = keyword;
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
      <AppHeader
        fetchNewData={(keyword) => debouncedFetchingNewData_trailing(UTILITY_VARIABLES.nextPageToken, keyword)}
      />
      <Route path="/">
        <Main>
          <Container>
              <VideoList
                videoListData={searchingResult} fetchNewData={() => {
                  debouncedFetchingNewData(UTILITY_VARIABLES.nextPageToken, UTILITY_VARIABLES.latestSearchedKeyword);
                }}
                scrollableHeight={UTILITY_VARIABLES.scrollableHeight}
              />
          </Container>
        </Main>
      </Route>
      <Route path="/:videoId" >
        {
          (renderedVideoCounter > 0) &&
          <VideoPlayer onMount={findVideo} videoData={selectedVideo} />
        }
      </Route>
    </Router>
  );
}
