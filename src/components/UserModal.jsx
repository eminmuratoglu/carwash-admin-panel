import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import "./UserModal.css";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UserProfile from "./UserProfile";
import UserSubscriptions from "./UserSubscriptions";
import UserPurchaseHistory from "./UserPurchaseHistory";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  py: 2,
  px: 3,
};

const UserModal = ({ selectedUser, updateUsers, openModal, handleClose }) => {
  const [tab, setTab] = useState("profile");
  const [updatedUser, setUpdatedUser] = useState(selectedUser);
  const [isEditing, setIsEditing] = useState(false);

  const handleTabChange = (_e, newValue) => {
    setTab(newValue);
    setIsEditing(false);
  };

  const toggleIsEditing = (value) => setIsEditing(value);

  const onModalClose = () => {
    handleClose();
    setIsEditing(false);
    setTab("profile");
  };

  useEffect(() => {
    setUpdatedUser(selectedUser);
  }, [selectedUser]);

  const handleChange = (e, tab, plate) => {
    if (tab === "active_subscriptions") {
      setUpdatedUser((prevState) => ({
        ...prevState,
        active_subscriptions: prevState.active_subscriptions.map((sub) => {
          if (sub.car_plate === plate) {
            return {
              ...sub,
              [e.target.name]: e.target.value,
            };
          }
          return sub;
        }),
      }));
    } else {
      setUpdatedUser((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSaveEdit = () => {
    console.log("UPDATED:", updatedUser);
    updateUsers(updatedUser);
    setIsEditing(false);
  };

  const removeSubscription = (plate) => {
    const updatedData = {
      ...selectedUser,
      // Remove from active subscriptions
      active_subscriptions: selectedUser.active_subscriptions.filter((sub) => {
        return sub.car_plate !== plate;
      }),
      // push it into history
      purchase_history: [
        ...selectedUser.purchase_history,
        selectedUser.active_subscriptions.find(
          (history) => history.car_plate === plate
        ),
      ],
    };
    updateUsers(updatedData);
  };

  const createSubscription = (newSubscription) => {
    updateUsers({
      ...selectedUser,
      active_subscriptions: [
        ...selectedUser.active_subscriptions,
        newSubscription,
      ],
    });
  };

  return (
    <div>
      <Modal className="userModal" open={openModal} onClose={onModalClose}>
        <Box sx={style} style={{ maxHeight: "500px", overflowY: "scroll" }}>
          <div className="modalHeader">
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              align="center"
            >
              {selectedUser.name}
            </Typography>
            <CloseIcon className="closeModalBtn" onClick={onModalClose} />
          </div>
          <hr />
          <div className="2 modalBody" id="modal-modal-description">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext indicatorColor={""} value={tab}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <TabList
                    onChange={handleTabChange}
                    aria-label="user details tabs"
                  >
                    <Tab
                      sx={{ textTransform: "none" }}
                      label="Profile"
                      value="profile"
                    />
                    <Tab
                      sx={{ textTransform: "none" }}
                      label="Subscriptions"
                      value="subscriptions"
                    />
                    <Tab
                      sx={{ textTransform: "none" }}
                      label="Purchase History"
                      value="purchaseHistory"
                    />
                  </TabList>
                </Box>
                <TabPanel className="tabPanel" value="profile">
                  <UserProfile
                    selectedUser={selectedUser}
                    toggleIsEditing={toggleIsEditing}
                    isEditing={isEditing}
                    handleChange={handleChange}
                    onSaveEdit={onSaveEdit}
                    updatedUser={updatedUser}
                  />
                </TabPanel>
                <TabPanel className="tabPanel" value="subscriptions">
                  <UserSubscriptions
                    activeSubscriptions={selectedUser.active_subscriptions}
                    toggleIsEditing={toggleIsEditing}
                    isEditing={isEditing}
                    handleChange={handleChange}
                    onSaveEdit={onSaveEdit}
                    removeSubscription={removeSubscription}
                    createSubscription={createSubscription}
                    updatedUser={updatedUser}
                  />
                </TabPanel>
                <TabPanel className="tabPanel" value="purchaseHistory">
                  <UserPurchaseHistory
                    purchaseHistory={selectedUser.purchase_history}
                    toggleIsEditing={toggleIsEditing}
                    isEditing={isEditing}
                    handleChange={handleChange}
                    onSaveEdit={onSaveEdit}
                    updatedUser={updatedUser}
                  />
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UserModal;
