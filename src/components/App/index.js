import React, { useState, useEffect } from "react";
import _ from "lodash";
import VideoList from "../VideoList";
import AppHeader from "../AppHeader";
import styled from "styled-components";
import Container from "../shared/Container";
import { searchYoutube } from '../../api/youtube';

const Main = styled.main`
  margin: 110px 0;
`;

const UTILITY_VARIABLES = {
  nextPageToken: '',
  scrollableHeight: -Infinity
};

export default function App() {
  const [ searchingResult, setSearchingResult ] = useState([]);
  const [ renderedVideoCounter, setRenderedVideoCounter ] = useState(0);

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

  const handleScrolling = (e) => {
    if (window.scrollY >= UTILITY_VARIABLES.scrollableHeight - 50) {
      debouncedFetchingNewData(UTILITY_VARIABLES.nextPageToken);
    }
  };

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
      window.removeEventListener('scroll', handleScrolling);
    }
  }, [renderedVideoCounter]);

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
