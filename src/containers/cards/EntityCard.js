// @flow
import React from 'react';

import { Map } from 'immutable';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  CardContainer,
  ClickableTableRow,
  ListTitle,
  ScrollContainer,
  Subheader,
  TableInnerWrapper,
  TableOuterWrapper,
  TableRow,
  TitleContainer,
} from './Styles';

type Props = {
  associations :[][];
  entity :Object;
};

const EntityCard = ({ entity, associations } :Props) => (
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

export default withRouter(
  connect(mapStateToProps)(EntityCard)
);
