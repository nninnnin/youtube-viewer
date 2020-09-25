import React, { useState } from "react";

import styled from "styled-components";
import logo from "../../assets/logo.svg";
import SearchInput from "../SearchInput";
import Container from "../shared/Container";
import Heading from "../shared/Heading";

const Header = styled.header`
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

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
      font-family: 'Poppins', sans-serif;
    }
  }

  img {
    height: 30px;
  }
`;

export default function AppHeader({ fetchNewData }) {
  const [ keyword, setKeyword ] = useState('');

  return (
    <Header>
      <Container>
        <section>
          <div className="brand">
            <img src={logo}
                alt="logo"
                style={{ position: 'relative', bottom: '3px' }}
            />
            <Heading href="/">Vanillatube</Heading>
          </div>
          <div className="input-container">
            <SearchInput
              placeholder="Youtube 검색"
              value={keyword}
              onChange={(val) => {
                setKeyword(val);
                if (val !== '') {
                  fetchNewData(val);
                }
              }}
            />
          </div>
        </section>
      </Container>
    </Header>
  );
}
