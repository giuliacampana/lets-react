/*
 * @flow
 */

import React, { Component } from 'react';

import styled from 'styled-components';
import axios from 'axios';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppHeaderContainer from './AppHeaderContainer';
import EntityList from '../cards/EntityList';
import EntityCard from '../cards/EntityCard';
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
      entities: [],
      properties: {},
      associations: []
    };

    this.getEntityTypes = this.getEntityTypes.bind(this);
    this.getPropertyTypes = this.getPropertyTypes.bind(this);
    this.getAssociationTypes = this.getAssociationTypes.bind(this);
    this.findAssociations = this.findAssociations.bind(this);
  }

  componentDidMount() {

    const { actions } = this.props;
    actions.loadApp(APP_NAME);

    this.getEntityTypes();
  }

  getEntityTypes() {
    axios.get('https://api.openlattice.com/datastore/edm/entity/type')
      .then((response) => {
        let ents = [];
        for (let i = 0; i < response.data.length; i += 1) {
          if (response.data[i].category === 'EntityType') {
            ents.push(response.data[i]);
          }
        }
        ents = ents.sort((a, b) => {
          return a.type.name.toLowerCase().localeCompare(b.type.name.toLowerCase());
        });
        this.setState({
          entities: ents
        });
      })
      .then(() => {
        this.getPropertyTypes();
      })
      .then(() => {
        this.getAssociationTypes();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getPropertyTypes() {
    axios.get('https://api.openlattice.com/datastore/edm/property/type')
      .then((response) => {
        let props = {};
        for (let i = 0; i < response.data.length; i++) {
          props[response.data[i].id] = response.data[i];
        }
        this.setState({
          properties: props
        });
      })
      .then(() => {
        for (let i = 0; i < this.state.entities.length; i++) {
          const entity = this.state.entities[i];
          for (let j = 0; j < entity.properties.length; j++) {
            let propName = this.state.properties[entity.properties[j]].type.name;
            
            entity.properties.splice(j, 1, propName);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAssociationTypes() {
    axios.get('https://api.openlattice.com/datastore/edm/association/type')
      .then((response) => {
        console.log(response.data);
        this.setState({
          associations: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  findAssociations(entityId) {
    console.log('this.state.associations inside func: ', this.state.associations);
    let allAssociations = [[], []];
    for (let i = 0; i < this.state.associations.length; i++) {
      if (this.state.associations[i].src.includes(entityId)) {
        allAssociations[0].push(this.state.associations[i]);
      }
      if (this.state.associations[i].dst.includes(entityId)) {
        allAssociations[1].push(this.state.associations[i]);
      }
    }
    return allAssociations;
  }

  render() {
    return (
      <Router>
        <AppContainerWrapper>
          <AppHeaderContainer />
          <AppContentOuterWrapper>
            <AppContentInnerWrapper>
              <Route
                  exact path="/"
                  render={props => <EntityList {...props} entities={this.state.entities} />} />
              <Route
                  path="/entities/:entityId"
                  render={({ match }) => <EntityCard entity={this.state.entities.find(entObj => entObj.id === match.params.entityId)} associations={this.findAssociations(match.params.entityId)} />} />
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
