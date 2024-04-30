import {
  DEFAULT_OPTIONS,
  getTheme,
} from '@table-library/react-table-library/material-ui';

const materialTheme = getTheme({
  ...DEFAULT_OPTIONS,
  highlightOnHover: true,
});

const customThemes = (direction, rotate) => {
  let customTheme;
  if (direction == 'rtl') {
    const transform = !rotate ? 0 : 0;
    customTheme = {
      Table: ` 
          --data-table-library_grid-template-columns:  24px repeat(5, minmax(0, 1fr));
          margin: 16px 0px;
          border-radius:5px;
          direction:rtl
        `,
      Header: `
          background-color: #fafafa;
          padding: 100px 0;
          position:absolute;
          .th{
            background-color: #dddddd;
          }
          
          .css-1p8xf1s-HEADER_CELL_CONTAINER_STYLE-HeaderCell{
            text-align:right
          }
        `,
      Row: `
          padding:20px;
          .css-lfhggw div{
            transform:rotate(${transform})
          }`,
    };
  } else {
    customTheme = {
      Table: `
          --data-table-library_grid-template-columns:  0px repeat(5, minmax(0, 1fr));
          margin: 16px 0px;
          border-radius:5px;
        `,
      Header: `
          background-color: #fafafa;
          padding: 100px 0;
          position:absolute;
          .th{
            background-color: #dddddd;
          }
          
        `,
      Row: `
          padding:20px
          
        `,
    };
  }
  return customTheme;
};

export { materialTheme, customThemes };
