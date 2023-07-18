import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

const NewSubscriptionForm = ({
  toggleForm,
  newSubscriptionInfo,
  handleChange,
  handleNewSubSubmit,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <TextField
        required
        type="text"
        name="plan"
        label="Plan"
        size="small"
        value={newSubscriptionInfo.plan}
        onChange={handleChange}
      />
      <TextField
        required
        type="text"
        placeholder="e.g. 2023-01-01"
        name="start_date"
        label="Start Date"
        size="small"
        value={newSubscriptionInfo.start_date}
        onChange={handleChange}
      />
      <TextField
        required
        type="text"
        placeholder="e.g. 2023-01-01"
        name="end_date"
        label="End Date"
        size="small"
        value={newSubscriptionInfo.end_date}
        onChange={handleChange}
      />
      <TextField
        required
        type="text"
        name="car_plate"
        label="Plate number"
        size="small"
        value={newSubscriptionInfo.car_plate}
        onChange={handleChange}
      />
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={() => toggleForm(false)}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          size="small"
          type="submit"
          onClick={() => {
            handleNewSubSubmit();
            toggleForm(false);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default NewSubscriptionForm;
