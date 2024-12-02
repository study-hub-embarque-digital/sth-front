import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ArtigoSearchBar = ({ searchTerm, onSearch, onKeyPress, searchBy }) => {
  const handleChange = (e) => {
    onSearch(e.target.value); 
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
      <TextField
        variant="outlined"
        placeholder={`Buscar por ${searchBy === 'autor' ? 'autor' : 'título'}`}
        sx={{
          backgroundColor: 'white',
          borderRadius: 4,
          width: '60%',
          maxWidth: 700,
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
          },
        }}
        value={searchTerm} 
        onChange={handleChange}
        onKeyPress={onKeyPress} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default ArtigoSearchBar;
