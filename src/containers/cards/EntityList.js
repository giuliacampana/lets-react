import React, { Component } from 'react';

import styled from 'styled-components';
import axios from 'axios';
import { Map } from 'immutable';
import { AuthActionFactory } from 'lattice-auth';
import { Colors } from '../../../lattice-ui-kit/build/lattice-ui-kit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

import { CardContainer, TitleContainer, ListTitle } from './Styles';


const { logout } = AuthActionFactory;
const { NEUTRALS } = Colors;

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
  &:hover {
    cursor: pointer;
    background-color: rgb(237, 246, 255);
    color: ${NEUTRALS[0]};
  }
`;

type Props = {
    actions :{
      logout :() => void;
    };
  };

class EntityList extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      entities: []
    }
  }

  componentDidMount() {
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
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <CardContainer>
        <TitleContainer>
          <ListTitle>Entities</ListTitle>
        </TitleContainer>
        <TableOuterWrapper>
          <TableInnerWrapper>
            <InnerScrollContainer>
              {
                this.state.entities.map(entity => (
                  <Link to={`entities/${entity.id}`}>
                    <TableRow key={entity.id}>{entity.type.name}</TableRow>
                  </Link>
                ))
              }
            </InnerScrollContainer>
          </TableInnerWrapper>
        </TableOuterWrapper>
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
  connect(mapStateToProps, mapDispatchToProps)(EntityList)
);
