import React, { Component } from 'react';

import styled from 'styled-components';
import { Map, List } from 'immutable';
import { AuthActionFactory } from 'lattice-auth';
import { Colors } from '../../../lattice-ui-kit/build/lattice-ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';


import {
  CardContainer, TitleContainer, ListTitle, TableOuterWrapper, TableInnerWrapper, ScrollContainer, TableRow, ClickableTableRow, Subheader
} from './Styles';

const { logout } = AuthActionFactory;
const { NEUTRALS } = Colors;

type Props = {
  actions :{
    logout :() => void;
  };
};

const EntityCard = ({ entity, associations }) => (
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
              <TableRow>{p}</TableRow>
            ))
          }
          <TitleContainer>
            <Subheader>Upstream Associations</Subheader>
          </TitleContainer>
          {
            associations[0].map(a => (
              <ClickableTableRow>{a.entityType.type.name}</ClickableTableRow>
            ))
          }
          <TitleContainer>
            <Subheader>Downstream Associations</Subheader>
          </TitleContainer>
          {
            associations[1].map(a => (
              <ClickableTableRow>{a.entityType.type.name}</ClickableTableRow>
            ))
          }
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
