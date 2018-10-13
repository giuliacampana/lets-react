import styled from 'styled-components';
import { Colors } from '../../../lattice-ui-kit/build/lattice-ui-kit';

const { NEUTRALS } = Colors;

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
  color: rgb(122, 82, 234);
  font-weight: 600;
  font-size: 24px;
  letter-spacing: 3px;
`;

const TableOuterWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  overflow: hidden;
`;

const TableInnerWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  direction: ltr;
  width: 562px;
  height: 550px;
  position: relative;
  will-change: transform;
  overflow: auto;
`;

const InnerScrollContainer = styled.div`
  width: 562px;
  height: 8000px;
  max-width: 562px;
  max-height: 8000px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ScrollContainer = styled(InnerScrollContainer)`
  height: auto;
  max-height: 4000px;
`;

const TableRow = styled.div`
  height: 50px;
  left: 0px;
  top: 0px;
  width: 655px;
  border-top: 1px solid rgb(197, 213, 229);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  padding: 18px;
`;

const ClickableTableRow = styled(TableRow)`
  &:hover {
    cursor: pointer;
    background-color: rgb(237, 246, 255);
    color: ${NEUTRALS[0]};
  }
`;

const Subheader = styled.h2`
  color: rgb(17, 51, 85);
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 3px;
`;

export {
  CardContainer,
  TitleContainer,
  ListTitle,
  TableOuterWrapper,
  TableInnerWrapper,
  InnerScrollContainer,
  ScrollContainer,
  TableRow,
  ClickableTableRow,
  Subheader
};
