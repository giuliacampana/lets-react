import React, { Component } from 'react';

import styled from 'styled-components';
import axios from 'axios';
import { Map, List } from 'immutable';
import { AuthActionFactory } from 'lattice-auth';
import { Colors } from '../../../lattice-ui-kit/build/lattice-ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

// import { localeData } from 'moment';

import { CardContainer, TitleContainer, ListTitle } from './Styles';


const { logout } = AuthActionFactory;
const { NEUTRALS } = Colors;

type Props = {
  actions :{
    logout :() => void;
  };
};

class EntityCard extends Component<Props> {
  render() {
    return (
      <CardContainer>
        <TitleContainer>
          <ListTitle>Title</ListTitle>
        </TitleContainer>
      </CardContainer>
    );
  }
}

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