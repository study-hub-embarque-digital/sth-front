import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ placeholder }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
      <TextField
        variant="outlined"
        placeholder={placeholder ?? "Buscar..."}
        sx={{
          backgroundColor: 'white',
          borderRadius: 4,
          width: '100%',
          // maxWidth: 700,
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
          },
        }}
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

export default SearchBar;
