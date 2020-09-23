import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/logo.svg";
import SearchInput from "../SearchInput";
import Container from "../shared/Container";
import Heading from "../shared/Heading";
import { searchYoutube } from '../../api/youtube';

const Header = styled.header`
  position: fixed;
  background-color: #ffffff;
  width: 100%;
  top: 0;
  z-index: 5;
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.1);

  section {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2em 0;
  }

  .brand {
    display: flex;
    align-items: center;

    h1 {
      margin-left: 10px;
      text-transform: uppercase;
    }
  }

  img {
    height: 30px;
  }

  .input-container {
    width: 300px;
    display: flex;
    white-space: nowrap;
  }
`;

export default function AppHeader({ updateSearchingResult }) {
  const [searchInput, setSearchInput] = useState('');

  async function handleSearchButtonClick () {
    console.log(searchInput);
    const searchKeys = {
      q: searchInput,
      maxResults: 10,
      type: "video"
    };
    const result = await searchYoutube(searchKeys);
    console.log(result);
    updateSearchingResult(result.items);
  }

  return (
    <Header>
      <Container>
        <section>
          <div className="brand">
            <img src={logo} alt="logo" />
            <Heading>VANILLA TUBE</Heading>
          </div>
          <div className="input-container">
            <SearchInput
              placeholder="Youtube 검색"
              value={searchInput}
              onChange={(val) => {
                setSearchInput(val);
              }}
            />
            <button onClick={handleSearchButtonClick}>찾기</button>
          </div>
        </section>
      </Container>
    </Header>
  );
}
