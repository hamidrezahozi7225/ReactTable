import { Header, HeaderRow } from '@table-library/react-table-library/table';
import { HeaderCellSort } from '@table-library/react-table-library/sort';

import { HeaderCellSelect } from '@table-library/react-table-library/select';
import PropTypes from 'prop-types';

const HeaderTable = ({ hiddenColumns }) => {
  return (
    <Header>
      <HeaderRow>
        <HeaderCellSelect />
        <HeaderCellSort hide={hiddenColumns.includes('NAME')} sortKey='TASK'>
          Name
        </HeaderCellSort>
        <HeaderCellSort
          hide={hiddenColumns.includes('CLASS')}
          sortKey='DEADLINE'
        >
          Class
        </HeaderCellSort>
        <HeaderCellSort
          hide={hiddenColumns.includes('ORGANIZATION')}
          sortKey='TYPE'
        >
          Organization
        </HeaderCellSort>
        <HeaderCellSort
          hide={hiddenColumns.includes('DESCRIPTION')}
          sortKey='COMPLETE'
        >
          Description
        </HeaderCellSort>
        <HeaderCellSort hide={hiddenColumns.includes('ID')} sortKey='TASKS'>
          id
        </HeaderCellSort>
      </HeaderRow>
    </Header>
  );
};

HeaderTable.propTypes = {
  hiddenColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HeaderTable;
