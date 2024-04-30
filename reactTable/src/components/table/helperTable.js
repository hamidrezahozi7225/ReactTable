import {
  findNodeById,
  recursiveMergeInsert,
} from '@table-library/react-table-library/common';

const needsToFetch = (nodes, id) => {
  const item = findNodeById(nodes, id);

  return item && item.nodes && !item.nodes.length;
};

const insertTree = (targetId, nodes, pageInfo) => (state) => {
  if (!targetId) {
    return {
      pageInfo,
      nodes: [...state.nodes, ...nodes],
    };
  }

  return {
    pageInfo: state.pageInfo,
    nodes: state.nodes.map(recursiveMergeInsert(targetId, nodes, { pageInfo })),
  };
};

const escapeCsvCell = (cell) => {
  if (cell == null) {
    return '';
  }
  const sc = cell.toString().trim();
  if (sc === '' || sc === '""') {
    return sc;
  }
  if (
    sc.includes('"') ||
    sc.includes(',') ||
    sc.includes('\n') ||
    sc.includes('\r')
  ) {
    return '"' + sc.replace(/"/g, '""') + '"';
  }
  return sc;
};

const makeCsvData = (columns, data) => {
  return data.reduce((csvString, rowItem) => {
    return (
      csvString +
      columns
        .map(({ accessor }) => escapeCsvCell(accessor(rowItem)))
        .join(',') +
      '\r\n'
    );
  }, columns.map(({ name }) => escapeCsvCell(name)).join(',') + '\r\n');
};

const downloadAsCsv = (columns, data, filename) => {
  const csvData = makeCsvData(columns, data);
  const csvFile = new Blob([csvData], { type: 'text/csv' });
  const downloadLink = document.createElement('a');

  downloadLink.display = 'none';
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

const handleDownloadCsv = (data) => {
  const columns = [
    { accessor: (item) => item.name, name: 'Name' },
    { accessor: (item) => item.assetClass.id, name: 'assetClass Id' },
    { accessor: (item) => item.organization.name, name: 'Organization NAme' },
    { accessor: (item) => item.description, name: 'Description' },
    { accessor: (item) => item.id, name: 'Id' },
  ];

  downloadAsCsv(columns, data.nodes, 'table');
};

const toggleColumn = (column, hiddenColumns, setHiddenColumns) => {
  if (hiddenColumns.includes(column)) {
    setHiddenColumns(hiddenColumns.filter((v) => v !== column));
  } else {
    setHiddenColumns(hiddenColumns.concat(column));
  }
};
const handleRowClick = (item, e) => {
  console.log('item', item);
  e.stopPropagation(); // Prevents the event from bubbling up // Sets the state to indicate the row was clicked
  console.log('Row clicked');
};

function onSelectChange(action, state) {
  console.log(action, state);
}

function onSortChange(action, state) {
  console.log(action, state);
}

export {
  needsToFetch,
  insertTree,
  handleDownloadCsv,
  toggleColumn,
  handleRowClick,
  onSelectChange,
  onSortChange,
};
