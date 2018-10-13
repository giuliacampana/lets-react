import styled from 'styled-components';

const CardContainer = styled.div`
    background-color: rgb(249, 252, 255);
    box-shadow: rgba(17, 51, 85, 0.15) 0px 2px 8px -2px;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: normal;
    max-width: 1000px;
    min-width: 500px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(197, 213, 229);
    border-image: initial;
    border-radius: 4px;
    padding: 30px;
    margin: 0px 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.h1`
//   color: rgb(17, 51, 85);
  color: rgb(122, 82, 234);
  font-weight: 600;
  font-size: 24px;
  letter-spacing: 3px;
`;

export {
  CardContainer,
  TitleContainer,
  ListTitle
};
