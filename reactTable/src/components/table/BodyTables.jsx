import React from 'react';
import { Body, Row, Cell } from '@table-library/react-table-library/table';
import { CellTree } from '@table-library/react-table-library/tree';
import { CellSelect } from '@table-library/react-table-library/select';
import { handleRowClick } from './helperTable';
import PropTypes from 'prop-types';

const BodyTables = ({ tableList, loadingIds, hiddenColumns }) => {
  return (
    <Body>
      {tableList.map((item) => {
        const showLoading = loadingIds.includes(item.id);
        return (
          <React.Fragment key={item.id}>
            <Row
              item={item}
              style={{
                width: '100%',
              }}
              onClick={(item, e) => handleRowClick(item, e)}
            >
              <CellSelect item={item} />
              <CellTree hide={hiddenColumns.includes('NAME')} item={item}>
                {item.name}
              </CellTree>
              <Cell hide={hiddenColumns.includes('CLASS')}>
                {item.assetClass.id}
              </Cell>
              <Cell hide={hiddenColumns.includes('ORGANIZATION')}>
                {item.organization.name}
              </Cell>
              <Cell hide={hiddenColumns.includes('DESCRIPTION')}>
                {item.description}
              </Cell>
              <Cell hide={hiddenColumns.includes('ID')}>{item.id}</Cell>
            </Row>
            {showLoading && (
              <div
                style={{
                  marginLeft: `${8 + item.treeXLevel * 20}px`,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                Loading ...
              </div>
            )}
          </React.Fragment>
        );
      })}
    </Body>
  );
};

BodyTables.propTypes = {
  tableList: PropTypes.array.isRequired,
  loadingIds: PropTypes.array.isRequired,
  hiddenColumns: PropTypes.array.isRequired,
};
export default BodyTables;
