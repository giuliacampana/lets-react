// @flow
import React from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import {
  CardContainer,
  ClickableTableRow,
  ListTitle,
  InnerScrollContainer,
  TableInnerWrapper,
  TableOuterWrapper,
  TitleContainer,
} from './Styles';

type Props = {
  entities :Object[];
};

const EntityList = ({ entities } :Props) => (
  <CardContainer>
    <TitleContainer>
      <ListTitle>Entities</ListTitle>
    </TitleContainer>
    <TableOuterWrapper>
      <TableInnerWrapper>
        <InnerScrollContainer>
          {
            entities.map((entity :Object) => (
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

export default withRouter(
  connect(mapStateToProps)(EntityList)
);
