import { useState } from "react";
import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import EditButton from "./EditButton";
import NewSubscriptionForm from "./NewSubscriptionForm";

const UserSubscriptions = ({
  activeSubscriptions,
  toggleIsEditing,
  isEditing,
  handleChange,
  onSaveEdit,
  removeSubscription,
  createSubscription,
  updatedUser,
}) => {
  const [newSubscriptionInfo, setNewSubscriptionInfo] = useState({
    plan: "",
    start_date: "",
    end_date: "",
    car_plate: "",
  });
  const [newSubFormOpen, setNewSubFormOpen] = useState(false);

  const toggleForm = (bool) => setNewSubFormOpen(bool);

  const handleNewSubsChange = (e) => {
    setNewSubscriptionInfo({
      ...newSubscriptionInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleNewSubSubmit = () => {
    createSubscription(newSubscriptionInfo);
    setNewSubFormOpen(false);
    setNewSubscriptionInfo({
      plan: "",
      start_date: "",
      end_date: "",
      car_plate: "",
    });
  };

  return (
    <>
      <Button
        size="small"
        sx={{
          display: "block",
          textTransform: "capitalize",
          marginBottom: "1rem",
        }}
        onClick={() => setNewSubFormOpen(true)}
      >
        + New Subscription
      </Button>
      {newSubFormOpen ? (
        <NewSubscriptionForm
          toggleForm={toggleForm}
          newSubscriptionInfo={newSubscriptionInfo}
          handleChange={handleNewSubsChange}
          handleNewSubSubmit={handleNewSubSubmit}
        />
      ) : activeSubscriptions.length ? (
        <>
          <EditButton handleClick={() => toggleIsEditing(true)} />
          <div>
            {activeSubscriptions.map(
              ({ plan, start_date, end_date, car_plate }) => {
                return (
                  <div key={car_plate + start_date}>
                    <div className="modalContent">
                      <div>Plan: </div>
                      {isEditing ? (
                        <Input
                          className="editInput"
                          name="plan"
                          onChange={(e) =>
                            handleChange(e, "active_subscriptions", car_plate)
                          }
                          value={
                            updatedUser.active_subscriptions.find(
                              (subscription) =>
                                subscription.car_plate === car_plate
                            )?.plan
                          }
                        />
                      ) : (
                        <div>{plan}</div>
                      )}

                      <div>Start Date: </div>
                      {isEditing ? (
                        <Input
                          className="editInput"
                          name="start_date"
                          onChange={(e) =>
                            handleChange(e, "active_subscriptions", car_plate)
                          }
                          value={
                            updatedUser.active_subscriptions.find(
                              (subscription) =>
                                subscription.car_plate === car_plate
                            )?.start_date
                          }
                        />
                      ) : (
                        <div>{start_date}</div>
                      )}

                      <div>End Date: </div>
                      {isEditing ? (
                        <Input
                          className="editInput"
                          name="end_date"
                          onChange={(e) =>
                            handleChange(e, "active_subscriptions", car_plate)
                          }
                          value={
                            updatedUser.active_subscriptions.find(
                              (subscription) =>
                                subscription.car_plate === car_plate
                            )?.end_date
                          }
                        />
                      ) : (
                        <div>{end_date}</div>
                      )}

                      <div>Car Plate: </div>
                      {isEditing ? (
                        <Input
                          className="editInput"
                          name="car_plate"
                          onChange={(e) =>
                            handleChange(e, "active_subscriptions", car_plate)
                          }
                          value={
                            updatedUser.active_subscriptions.find(
                              (subscription) =>
                                subscription.car_plate === car_plate
                            )?.car_plate
                          }
                        />
                      ) : (
                        <div>{car_plate}</div>
                      )}
                    </div>
                    {!isEditing && (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                        onClick={() => removeSubscription(car_plate)}
                      >
                        Cancel Subscription
                      </Button>
                    )}
                    <hr />
                  </div>
                );
              }
            )}
            {isEditing ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}
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
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", margin: "2rem" }}>
          No active subscriptions found.
        </div>
      )}
    </>
  );
};

export default UserSubscriptions;
