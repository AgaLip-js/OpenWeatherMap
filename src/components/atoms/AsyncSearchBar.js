import { debounce } from 'lodash';
import React from 'react';
import { useDispatch } from 'react-redux';
import AsyncSelect from "react-select/async";
import { getSearchOptions } from '../../api/api';
import { getSelectedLocation } from '../../redux/actions/weatherActions';

const AsyncSearchBar = () => {
  const dispatch = useDispatch();

  const loadOptions = React.useCallback(
    debounce((value, callback) => {
      getSearchOptions(value).then(options => callback(options));
    }, 600),
    [],
  );

  const customStyles = {
    control: provided => ({
      ...provided,
      width: '100%',
      height: '5rem',
    }),
  };

  const handleChange = (value) => {
    dispatch(getSelectedLocation(value));
  };

  return (
    <AsyncSelect
      defaultOptions={[]}
      loadOptions={loadOptions}
      getOptionLabel={e => `${e.name} (${e.country})`}
      getOptionValue={e => e.lat}
      placeholder="Enter location"
      onChange={value => handleChange(value)}
      isClearable
      defaultValue={[]}
      noOptionsMessage={({ inputValue }) => !inputValue ? 'No search results' : 'No results found'}
      styles={customStyles}
    />
  );
};

export default AsyncSearchBar;
