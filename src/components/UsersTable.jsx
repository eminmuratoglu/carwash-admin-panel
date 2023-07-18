import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PeopleIcon from "@mui/icons-material/People";
import UserModal from "./UserModal";
import "./UsersTable.css";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL =
  process.env.NODE_ENV == "development" ? "http://localhost:5173" : "";

const UsersTable = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/db.json`);
      setAllUsers(data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUsers = (updatedData) => {
    const updatedUsers = allUsers.map((user) => {
      if (user.id === updatedData.id) {
        const updatedUser = {
          ...user,
          ...updatedData,
          active_subscriptions:
            updatedData.active_subscriptions || user.active_subscriptions,
          purchase_history:
            updatedData.purchase_history || user.purchase_history,
        };
        if (selectedUser && selectedUser.id === updatedData.id) {
          setSelectedUser(updatedUser);
        }
        return updatedUser;
      }
      return user;
    });
    setAllUsers(updatedUsers);
    console.log("IN UPDATE USER:", updatedUsers);
    toast.success("User has been updated.");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "5px",
          marginLeft: "1rem",
        }}
      >
        <PeopleIcon />
        <h4>Users</h4>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => {
                  setSelectedUser(row);
                  handleOpen();
                }}
                hover
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      {Object.keys(selectedUser).length ? (
        <UserModal
          selectedUser={selectedUser}
          updateUsers={updateUsers}
          openModal={openModal}
          handleClose={handleClose}
        />
      ) : null}
    </div>
  );
};

export default UsersTable;
