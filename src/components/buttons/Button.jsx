import Button from "@mui/material/Button";
import "../components.scss";

const ButtonDefault = ({ name, handleMentoriaClick, startIcon, sx }) => {
  return (
    <Button
      className="buttonDefault"
      onClick={handleMentoriaClick}
      startIcon={startIcon}
      sx={sx}
    >
      {name}
    </Button>
  );
};

export default ButtonDefault;
