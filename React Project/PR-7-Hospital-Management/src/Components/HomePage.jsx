import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  TablePagination, // <-- Import TablePagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getStorageData, setStorageData } from '../utils/PatientData';
import PatientCard from './PatientCard';

const colors = {
  primary: '#2A5C99',
  lightGray: '#F5F5F5',
  softGreen: '#7CB342',
  coralRed: '#FF6B6B',
  darkGray: '#333333',
  white: '#FFFFFF',
};

const HomePage = () => {
  const [patients, setPatients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [page, setPage] = useState(0); // <-- Add page state
  const [rowsPerPage, setRowsPerPage] = useState(5); // <-- Add rowsPerPage state
  const navigate = useNavigate();

  useEffect(() => {
    const storedPatients = getStorageData();
    setPatients(storedPatients);
  }, []);

  const handleDelete = (id) => {
    const updatedList = patients.filter((p) => p.patientId !== id);
    setStorageData(updatedList);
    setPatients(updatedList);
  };

  const handleView = (id) => {
    const patient = patients.find((p) => p.patientId === id);
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate the current page's patients
  const paginatedPatients = patients.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, color: colors.primary, fontWeight: 700 }}>
        Patient List
      </Typography>
      {patients.length === 0 ? (
        <Typography>No patients found. Please add new patients.</Typography>
      ) : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: colors.primary }}>
                <TableRow>
                  <TableCell sx={{ color: colors.white }}>ID</TableCell>
                  <TableCell sx={{ color: colors.white }}>Name</TableCell>
                  <TableCell sx={{ color: colors.white }}>Age</TableCell>
                  <TableCell sx={{ color: colors.white }}>Gender</TableCell>
                  <TableCell sx={{ color: colors.white }}>Contact</TableCell>
                  <TableCell sx={{ color: colors.white }}>Doctor</TableCell>
                  <TableCell sx={{ color: colors.white }}>Created</TableCell>
                  <TableCell sx={{ color: colors.white }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedPatients.map((patient) => (
                  <TableRow key={patient.patientId}>
                    <TableCell>{patient.patientId}</TableCell>
                    <TableCell>{patient.fullName}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.contact}</TableCell>
                    <TableCell>{patient.recommendedDoctor}</TableCell>
                    <TableCell>
                      {patient.createdDate} {patient.createdTime}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleView(patient.patientId)}
                        sx={{ mr: 1 }}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleEdit(patient.patientId)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(patient.patientId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Pagination controls */}
          <TablePagination
            component="div"
            count={patients.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </Paper>
      )}

      {/* Patient Card Popup Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
        <Box p={2}>
          <PatientCard patient={selectedPatient} />
          <Box textAlign="right" mt={2}>
            <Button variant="contained" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default HomePage;
