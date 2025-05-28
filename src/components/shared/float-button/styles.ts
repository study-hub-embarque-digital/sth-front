import { Fab } from "@mui/material";
import styled from "styled-components";

interface IFloatButtonStyledProps {
  fixed?: boolean,
  position?: 'BOTTOM_RIGHT'
}

export const CustomizedFloatButton = styled(Fab)<IFloatButtonStyledProps>(({ theme, fixed = true, position = 'BOTTOM_RIGHT' }) => [
  {
    position: fixed ? 'fixed' : 'relative',
  },
  position == "BOTTOM_RIGHT" && {
    bottom: 20,
    right: 20
  }
]);

//  <Fab
//         color="primary"
//         sx={{
//           position: 'fixed',
//           bottom: 16,
//           right: 16,
//           backgroundColor: '#6D35A0',
//           '&:hover': { backgroundColor: '#552A80' },
//         }}
//         onClick={toggleModal}
//       >
//         <AddIcon />
//       </Fab>