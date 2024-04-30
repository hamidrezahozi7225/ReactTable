import { Stack, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { toggleColumn } from './helperTable';
import PropTypes from 'prop-types';

const HiddenColumens = ({ hiddenColumns, setHiddenColumns }) => {
  return (
    <Stack spacing={10}>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={!hiddenColumns.includes('NAME')}
              onChange={() =>
                toggleColumn('NAME', hiddenColumns, setHiddenColumns)
              }
            />
          }
          label='Name'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={!hiddenColumns.includes('CLASS')}
              onChange={() =>
                toggleColumn('CLASS', hiddenColumns, setHiddenColumns)
              }
            />
          }
          label='CLASS'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={!hiddenColumns.includes('ORGANIZATION')}
              onChange={() =>
                toggleColumn('ORGANIZATION', hiddenColumns, setHiddenColumns)
              }
            />
          }
          label='ORGANIZATION'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={!hiddenColumns.includes('DESCRIPTION')}
              onChange={() =>
                toggleColumn('DESCRIPTION', hiddenColumns, setHiddenColumns)
              }
            />
          }
          label='DESCRIPTION'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={!hiddenColumns.includes('ID')}
              onChange={() =>
                toggleColumn('ID', hiddenColumns, setHiddenColumns)
              }
            />
          }
          label='ID'
        />
      </FormGroup>
    </Stack>
  );
};

HiddenColumens.propTypes = {
  hiddenColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  setHiddenColumns: PropTypes.func.isRequired,
};

export default HiddenColumens;
