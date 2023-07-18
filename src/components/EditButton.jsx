import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

const EditButton = ({ handleClick }) => {
  return (
    <Button
      sx={{
        px: 1,
        py: 0.3,
        justifyContent: "flex-start",
        textTransform: "capitalize",
      }}
      variant="outlined"
      startIcon={<EditIcon />}
      onClick={handleClick}
    >
      Edit
    </Button>
  );
};

export default EditButton;
