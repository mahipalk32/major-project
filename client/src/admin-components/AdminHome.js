import axios from "axios";
import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import SeparateDetails from "./SeparateDetails";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";

const AdminHome = () => {
  const [mailsData, setMailsData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/application_mails")
      .then((res) => {
        setMailsData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleView = (user) => {
    setSelectedUser(user);
    setShowDetails(true)
  };

  const handleAcceptReject = () => {
    setShowDetails(false)
  }

  return (
    <div style={{ margin: "50px" }}>
      <h2>USER APPLICATIONS</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Sino</strong>
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <strong>Application email</strong>
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <strong>View Application</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mailsData && mailsData.length > 0 ? (
              mailsData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell style={{ cursor: "pointer", textAlign: "center" }}>
                    {data.email}
                  </TableCell>
                  <TableCell
                    style={{
                      cursor: "pointer",
                      justifyContent: "center",
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="inherit"
                      onClick={() => handleView(data)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {showDetails && selectedUser && (
        <SeparateDetails name={selectedUser.name} email = {selectedUser.email} onAcceptReject = {handleAcceptReject} />
      )}
    </div>
  );
};
export default AdminHome;
