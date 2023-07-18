import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import EditButton from "./EditButton";

const UserProfile = ({
  selectedUser,
  toggleIsEditing,
  isEditing,
  handleChange,
  onSaveEdit,
  updatedUser,
}) => {
  return (
    <>
      <EditButton handleClick={() => toggleIsEditing(true)} />
      <div className="modalContent">
        <div>Name: </div>
        {isEditing ? (
          <Input
            className="editInput"
            name="name"
            onChange={handleChange}
            value={updatedUser.name}
          />
        ) : (
          <div>{selectedUser.name}</div>
        )}
        <div>Email: </div>
        {isEditing ? (
          <Input
            name="email"
            onChange={handleChange}
            value={updatedUser.email}
          />
        ) : (
          <div>{selectedUser.email}</div>
        )}
        <div>Phone: </div>
        {isEditing ? (
          <Input
            name="phone"
            onChange={handleChange}
            value={updatedUser.phone}
          />
        ) : (
          <div>{selectedUser.phone}</div>
        )}
        <div>Address: </div>
        {isEditing ? (
          <Input
            name="address"
            onChange={handleChange}
            value={updatedUser.address}
          />
        ) : (
          <div>{selectedUser.address}</div>
        )}
      </div>
      {isEditing ? (
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
        >
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => toggleIsEditing(false)}
          >
            Cancel
          </Button>
          <Button variant="outlined" size="small" onClick={onSaveEdit}>
            Save
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default UserProfile;
