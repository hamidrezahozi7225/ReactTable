import * as React from 'react';

import { Table } from '@table-library/react-table-library/table';
import {
  useTree,
  TreeExpandClickTypes,
} from '@table-library/react-table-library/tree';

import { useTheme } from '@table-library/react-table-library/theme';

import { useSort } from '@table-library/react-table-library/sort';
import PropTypes from 'prop-types';

import {
  useRowSelect,
  SelectClickTypes,
} from '@table-library/react-table-library/select';

import {
  handleDownloadCsv,
  insertTree,
  needsToFetch,
  onSelectChange,
  onSortChange,
} from './helperTable';
import { customThemes, materialTheme } from './themeTable';
import HiddenColumens from './HiddenColumens';
import CSVBtn from './CSVBtn';
import HeaderTable from './HeaderTable';
import BodyTables from './BodyTables';
import { axiosInstance } from './axiosInstance/axiosInstance';

const ReactTable = ({ direction }) => {
  const [data, setData] = React.useState({
    nodes: [],
  });
  const [hiddenColumns, setHiddenColumns] = React.useState([
    'CLASS',
    'DESCRIPTION',
  ]);
  const [loadingIds, setLoadingIds] = React.useState([]);
  const [rotate, setRotate] = React.useState(false);
  const theme = useTheme([materialTheme, customThemes(direction, rotate)]);

  const doGet = React.useCallback(async (params) => {
    const res = await axiosInstance.get(
      `http://185.79.156.67:4098/eam/api/asset/search-asset-level?pageNumber=0&pageSize=20&assetSortType=&sortAscending=true&assetFieldId=&keyword=&trilogyType=ASSET&trilogyId=${
        params && params.id ? params.id : ''
      }`
    );
    let data = await res.data.assets;
    data.map((item) => (item.nodes = []));
    setData(insertTree(params.id, data));
  }, []);

  React.useEffect(() => {
    setData({
      nodes: [],
    });

    doGet({
      isShallow: true,
    });
  }, []);

  const tree = useTree(
    data,
    {
      onChange: onTreeChange,
    },
    {
      clickType: TreeExpandClickTypes.ButtonClick,
      treeYLevel: 1,
    }
  );

  async function onTreeChange(action, state) {
    if (state?.ids.length == 0) {
      setRotate(false);
    } else {
      setRotate(true);
    }
    if (action.type !== 'ADD_BY_ID') return;
    if (!needsToFetch(data.nodes, action.payload.id)) return;

    const params = {
      id: action.payload.id,
      isShallow: true,
      nested: true,
    };

    setLoadingIds(loadingIds.concat(action.payload.id));
    await doGet(params);
    setLoadingIds(loadingIds.filter((id) => id !== action.payload.id));
  }

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortFns: {
        TASK: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
        TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
        COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
        TASKS: (array) =>
          array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
    }
  );

  const select = useRowSelect(
    data,
    {
      onChange: onSelectChange,
    },
    {
      clickType: SelectClickTypes.ButtonClick,
    }
  );

  return (
    <>
      <CSVBtn data={data} handleDownloadCsv={handleDownloadCsv} />
      <HiddenColumens
        hiddenColumns={hiddenColumns}
        setHiddenColumns={setHiddenColumns}
      />
      <Table select={select} data={data} sort={sort} tree={tree} theme={theme}>
        {(tableList) => (
          <>
            <HeaderTable hiddenColumns={hiddenColumns} />
            <BodyTables
              tableList={tableList}
              loadingIds={loadingIds}
              hiddenColumns={hiddenColumns}
            />
          </>
        )}
      </Table>
    </>
  );
};

ReactTable.propTypes = {
  direction: PropTypes.string,
};

export default ReactTable;
