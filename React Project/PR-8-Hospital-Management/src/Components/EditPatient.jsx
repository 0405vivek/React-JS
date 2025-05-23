import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getStorageData, setStorageData } from '../utils/PatientData';

const genders = ['Male', 'Female', 'Other'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const admitTypes = ['General', 'ICU', 'Emergency', 'Private'];
const doctors = [
  'Dr. Smith - Cardiologist',
  'Dr. Johnson - Neurologist',
  'Dr. Patel - Orthopedic',
  'Dr. Chen - Pediatrician',
  'Dr. Khan - Surgeon',
  'Dr. Mehta - Dermatologist',
];

const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientId: '',
    fullName: '',
    age: '',
    gender: '',
    dateOfBirth: '',
    contact: '',
    emergencyContact: '',
    address: '',
    bloodGroup: '',
    recommendedDoctor: '',
    admitType: '',
    createdDate: '',
    createdTime: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const patients = getStorageData();
    const patient = patients.find((p) => p.patientId === id);
    if (patient) {
      setFormData(patient);
    } else {
      alert('Patient not found');
      navigate('/');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.age || formData.age < 0) newErrors.age = 'Valid age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.contact || !/^\d{10}$/.test(formData.contact))
      newErrors.contact = 'Valid 10-digit contact number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required';
    if (!formData.recommendedDoctor) newErrors.recommendedDoctor = 'Doctor is required';
    if (!formData.admitType) newErrors.admitType = 'Admit type is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const patients = getStorageData();
      const updated = patients.map((p) =>
        p.patientId === id ? { ...formData } : p
      );
      setStorageData(updated);
      // alert('Patient updated successfully');
      navigate('/');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Edit Patient
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Patient ID"
            name="patientId"
            value={formData.patientId}
            disabled
            margin="normal"
          />
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            margin="normal"
            error={!!errors.fullName}
            helperText={errors.fullName}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            margin="normal"
            error={!!errors.age}
            helperText={errors.age}
          />
          <TextField
            fullWidth
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth}
          />
        </Box>

        <TextField
          fullWidth
          select
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          margin="normal"
          error={!!errors.gender}
          helperText={errors.gender}
        >
          {genders.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          select
          label="Blood Group"
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          margin="normal"
          error={!!errors.bloodGroup}
          helperText={errors.bloodGroup}
        >
          {bloodGroups.map((group) => (
            <MenuItem key={group} value={group}>
              {group}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Contact Number"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          margin="normal"
          error={!!errors.contact}
          helperText={errors.contact}
        />

        <TextField
          fullWidth
          label="Emergency Contact"
          name="emergencyContact"
          value={formData.emergencyContact}
          onChange={handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Address"
          name="address"
          multiline
          rows={3}
          value={formData.address}
          onChange={handleChange}
          margin="normal"
          error={!!errors.address}
          helperText={errors.address}
        />

        <TextField
          fullWidth
          select
          label="Recommended Doctor"
          name="recommendedDoctor"
          value={formData.recommendedDoctor}
          onChange={handleChange}
          margin="normal"
          error={!!errors.recommendedDoctor}
          helperText={errors.recommendedDoctor}
        >
          {doctors.map((doctor) => (
            <MenuItem key={doctor} value={doctor}>
              {doctor}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          select
          label="Admit Type"
          name="admitType"
          value={formData.admitType}
          onChange={handleChange}
          margin="normal"
          error={!!errors.admitType}
          helperText={errors.admitType}
        >
          {admitTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }} fullWidth>
          Update Patient
        </Button>
      </Box>
    </Paper>
  );
};

export default EditPatient;
