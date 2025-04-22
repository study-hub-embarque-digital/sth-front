import { styled } from '@mui/material/styles';
import { Tabs } from '@mui/material';

const TabContainer = styled(Tabs)(({ theme }) => [
  {
    borderBottom: `1px solid ${theme.palette.tabs.border}`,

    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: theme.palette.tabs.activeTab,
    },

    '& .Mui-selected': {
      backgroundColor: theme.palette.tabs.activeTab,
      borderRadius: '20px',
      color: '#FFF !important',
    },

    '& .MuiButtonBase-root': {
      marginBottom: '10px'
    }
  },
  theme.applyStyles('dark', {
  }),
]);

export { TabContainer };