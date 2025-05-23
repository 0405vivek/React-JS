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
  TableSortLabel,
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
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...patients].sort((a, b) => {
      if (typeof a[key] === 'number') {
        return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
      } else {
        return direction === 'asc'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });

    setSortConfig({ key, direction });
    setPatients(sorted);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPatients = patients.filter((patient) => {
    const term = searchTerm.toLowerCase();
    return (
      patient.fullName.toLowerCase().includes(term) ||
      patient.contact.toLowerCase().includes(term) ||
      patient.recommendedDoctor.toLowerCase().includes(term)
    );
  });

  return (
    <Box sx={{ padding: 3 }}>
      {/* Header with search */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: colors.lightGray,
          padding: '16px',
          borderRadius: '8px',
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 700 }}>
          Patient List
        </Typography>
        <input
          type="text"
          placeholder="Search by name, contact or doctor"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
            width: '300px',
          }}
        />
      </Box>

      {/* Patient Table */}
      {filteredPatients.length === 0 ? (
        <Typography>No matching patients found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: colors.primary }}>
              <TableRow>
                {['patientId', 'fullName', 'age', 'gender'].map((field) => (
                  <TableCell
                    key={field}
                    sortDirection={sortConfig.key === field ? sortConfig.direction : false}
                  >
                    <TableSortLabel
                      active={sortConfig.key === field}
                      direction={sortConfig.key === field ? sortConfig.direction : 'asc'}
                      onClick={() => handleSort(field)}
                      sx={{
                        color: colors.white,
                        '& .MuiTableSortLabel-icon': { color: colors.white },
                      }}
                    >
                      {field === 'patientId'
                        ? 'ID'
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell sx={{ color: colors.white }}>Contact</TableCell>
                <TableCell sx={{ color: colors.white }}>Doctor</TableCell>
                <TableCell sx={{ color: colors.white }}>Created</TableCell>
                <TableCell sx={{ color: colors.white }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients.map((patient) => (
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
                      variant="contained"
                      sx={{ backgroundColor: colors.primary, color: colors.white, mr: 1 }}
                      onClick={() => handleView(patient.patientId)}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: colors.softGreen, color: colors.white, mr: 1 }}
                      onClick={() => handleEdit(patient.patientId)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: colors.coralRed, color: colors.white }}
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
      )}

      {/* Patient Modal */}
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
