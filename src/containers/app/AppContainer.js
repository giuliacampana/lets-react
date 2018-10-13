/*
 * @flow
 */

import React, { Component } from 'react';

import styled from 'styled-components';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import AppHeaderContainer from './AppHeaderContainer';
import { loadApp } from './AppActions';
import { APP_NAME } from '../../utils/Constants';
import {
  APP_CONTAINER_MAX_WIDTH,
  APP_CONTAINER_WIDTH,
  APP_CONTENT_PADDING
} from '../../core/style/Sizes';

// TODO: this should come from lattice-ui-kit, maybe after the next release. current version v0.1.1
const APP_CONTENT_BG :string = '#f8f8fb';

const AppContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
  min-width: ${APP_CONTAINER_WIDTH}px;
  padding: 0;
`;

const AppContentOuterWrapper = styled.main`
  background-color: ${APP_CONTENT_BG};
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  position: relative;
`;

const AppContentInnerWrapper = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: ${APP_CONTAINER_MAX_WIDTH}px;
  padding: ${APP_CONTENT_PADDING}px;
  position: relative;
`;

type Props = {
  actions :{
    loadApp :RequestSequence;
  };
  isLoadingApp :boolean;
};

class AppContainer extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      entities: {},
      associations: {}
    };
  }

  componentDidMount() {

    const { actions } = this.props;
    actions.loadApp(APP_NAME);
  }

  render() {
    return (
      <Router>
        <AppContainerWrapper>
          <AppHeaderContainer />
          <AppContentOuterWrapper>
            <AppContentInnerWrapper>
            </AppContentInnerWrapper>
          </AppContentOuterWrapper>
        </AppContainerWrapper>
      </Router>
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
    actions: bindActionCreators({ loadApp }, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AppContainer)
);
