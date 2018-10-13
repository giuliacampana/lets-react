import React, { Component } from 'react';

import { Map } from 'immutable';
import { AuthActionFactory } from 'lattice-auth';
import { Colors } from '../../../lattice-ui-kit/build/lattice-ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import {
  CardContainer, TitleContainer, ListTitle, TableOuterWrapper, TableInnerWrapper, InnerScrollContainer, TableRow, ClickableTableRow
} from './Styles';


const { logout } = AuthActionFactory;
const { NEUTRALS } = Colors;

type Props = {
    actions :{
      logout :() => void;
    };
  };

const EntityList = props => (
  <CardContainer>
    <TitleContainer>
      <ListTitle>Entities</ListTitle>
    </TitleContainer>
    <TableOuterWrapper>
      <TableInnerWrapper>
        <InnerScrollContainer>
          {
            props.entities.map(entity => (
              <Link to={`entities/${entity.id}`} style={{ textDecoration: 'none', color: '#8e929b' }}>
                <ClickableTableRow key={entity.id}>{entity.type.name}</ClickableTableRow>
              </Link>
            ))
          }
        </InnerScrollContainer>
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
  connect(mapStateToProps, mapDispatchToProps)(EntityList)
);
