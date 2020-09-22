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

let scrollableHeight = -Infinity; // 이게 여기있는게 옳은걸까?
let nextPageToken = '';

export default function App() {
  const [ searchingResult, setSearchingResult ] = useState([]);
  const [ renderedVideoCounter, setRenderedVideoCounter ] = useState(0);

  useEffect(() => {
    // 매번 리렌더링 때 마다 렌더링 된 비디오의 갯수를 업데이트한다
    const renderedVideo = document.getElementsByClassName('video-list-wrapper')[0].children;

    if (renderedVideoCounter !== renderedVideo.length) {
      setRenderedVideoCounter(renderedVideo.length);
      console.log(renderedVideo.length + '개의 비디오가 렌더링 되었습니다');
    }
  });

  useEffect(() => {
    const main = document.getElementsByTagName('main')[0];

    let mainElementMargin = 0;
    mainElementMargin += parseInt(window.getComputedStyle(main).getPropertyValue('margin-top'));
    mainElementMargin += parseInt(window.getComputedStyle(main).getPropertyValue('margin-bottom'));

    const viewerHeight = window.innerHeight;
    scrollableHeight = main.offsetHeight + mainElementMargin - viewerHeight;

    console.log(scrollableHeight);
  }, [renderedVideoCounter]);

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      console.log(window.scrollY);
      console.log(scrollableHeight);

      // scrollable 의 80%보다 scrollY가 크다면 새로운 데이터 펫칭 실행하기
      if (window.scrollY >= scrollableHeight * 0.8) {
        console.log('지금이야!!');

        const debouncedFetchingNewData = _.debounce(fetchingNewData, 1000, {leading: true});
        // 내가 원하는건 fetchingNewData가 처음 한번만 실행되는 거
        // leading과 trailing 옵션으로 조절할 수 있을 것 같다
        // https://medium.com/@ellenaua/throttle-debounce-behavior-lodash-6bcae1494e03
      }
    });

    async function fetchingNewData (nextPageToken) {
      try {
        const result = await searchYoutube({
          maxResults: 10,
          nextPageToken
        });
        console.log(result);
        setSearchingResult(result.items);
        nextPageToken = result.nextPageToken;
      } catch (err) {
        console.log(err);
      }
    }

    fetchingNewData(10);
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
