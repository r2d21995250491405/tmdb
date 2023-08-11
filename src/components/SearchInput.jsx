import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

function SearchInput({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <TextField
        label="Search Movies"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </form>
  );
}

export default SearchInput;
