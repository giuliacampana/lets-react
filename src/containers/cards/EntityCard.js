import React, { Component } from 'react';

import styled from 'styled-components';
import { Map, List } from 'immutable';
import { AuthActionFactory } from 'lattice-auth';
import { Colors } from '../../../lattice-ui-kit/build/lattice-ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

// import { localeData } from 'moment';

import {
  CardContainer, TitleContainer, ListTitle, TableOuterWrapper, TableInnerWrapper, InnerScrollContainer, TableRow, Subheader
} from './Styles';

const { logout } = AuthActionFactory;
const { NEUTRALS } = Colors;

type Props = {
  actions :{
    logout :() => void;
  };
};

const CardTableRow = styled(TableRow)`
  justify-content: space-between;
`;

const ScrollContainer = styled(InnerScrollContainer)`
  height: auto;
  max-height: 4000px;
`;


const EntityCard = ({ entity }) => (
  <CardContainer>
    <TitleContainer>
      <ListTitle>{entity.type.name}</ListTitle>
    </TitleContainer>
    <TableOuterWrapper>
      <TableInnerWrapper>
        <ScrollContainer>
          <TitleContainer>
            <Subheader>Properties</Subheader>
          </TitleContainer>
          {
            entity.properties.map(p => (
              <CardTableRow>{p}</CardTableRow>
            ))
          }
          <TitleContainer>
            <Subheader>Upstream Associations</Subheader>
          </TitleContainer>
          <TitleContainer>
            <Subheader>Downstream Associations</Subheader>
          </TitleContainer>
        </ScrollContainer>
      </TableInnerWrapper>
    </TableOuterWrapper>
  </CardContainer>
);

function mapStateToProps(state :Map<*, *>) :Object {

  return {
    isLoadingApp: state.getIn(['app', 'isLoadingApp'], false),
  };
}

function mapDispatchToProps(dispatch :Function) :Object {

  return {
    actions: bindActionCreators({ logout }, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EntityCard)
);