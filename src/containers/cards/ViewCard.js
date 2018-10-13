import React, { Component } from 'react';

import styled from 'styled-components';
import axios from 'axios';
import { Map } from 'immutable';
import { AuthActionFactory } from 'lattice-auth';
import { Button, Colors } from '../../../lattice-ui-kit/build/lattice-ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import EntityList from './EntityList';
import EntityCard from './EntityCard';

import * as Routes from '../../core/router/Routes';
import { APP_NAME } from '../../utils/Constants';
import { localeData } from 'moment';Switch

const { logout } = AuthActionFactory;
const { NEUTRALS } = Colors;

const Root = styled.div`
`;

type Props = {
    actions :{
      logout :() => void;
    };
  };


class ViewCard extends Component<Props> {
  render() {
    return (
      <Switch>
          <Route exact={true} path="/" component={EntityList}></Route>
          <Route path="/entities/:entityId" component={EntityCard} />
      </Switch>
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
  connect(mapStateToProps, mapDispatchToProps)(ViewCard)
);
