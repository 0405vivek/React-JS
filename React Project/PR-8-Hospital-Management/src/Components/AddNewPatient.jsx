import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import { getStorageData, setStorageData } from "../utils/PatientData";
import { useParams, useNavigate } from 'react-router-dom';

const genders = ["Male", "Female", "Other"];
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const doctors = [
  { name: "Dr. Smith", specialization: "Cardiologist" },
  { name: "Dr. Johnson", specialization: "Neurologist" },
  { name: "Dr. Patel", specialization: "Pediatrician" },
  { name: "Dr. Chen", specialization: "Orthopedic Surgeon" },
  { name: "Dr. Kim", specialization: "Dermatologist" },
  { name: "Dr. Lopez", specialization: "General Physician" },
  { name: "Dr. Ahmed", specialization: "ENT Specialist" },
  { name: "Dr. Mehta", specialization: "Oncologist" },
];
const admitTypes = ['General', 'ICU', 'Emergency', 'Private'];

const AddNewPatient = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    fullName: "",
    age: "",
    gender: "",
    dateOfBirth: "",
    contact: "",
    emergencyContact: "",
    address: "",
    bloodGroup: "",
    recommendedDoctor: "",
    admitType: '',
    createdDate: "",
    createdTime: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(" ")[0];
    setFormData((prev) => ({
      ...prev,
      createdDate: date,
      createdTime: time,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.patientId) newErrors.patientId = "Patient ID is required";
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.age || formData.age < 0)
      newErrors.age = "Valid age is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.contact || !/^\d{10}$/.test(formData.contact))
      newErrors.contact = "Valid 10-digit contact number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!formData.recommendedDoctor)newErrors.recommendedDoctor = "Recommended doctor is required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const newPatient = { ...formData };
      const existingPatients = getStorageData();
      const updatedList = Array.isArray(existingPatients)
        ? [...existingPatients, newPatient]
        : [newPatient];
      setStorageData(updatedList);

      const now = new Date();
      const date = now.toISOString().split("T")[0];
      const time = now.toTimeString().split(" ")[0];
      setFormData({
        patientId: "",
        fullName: "",
        age: "",
        gender: "",
        dateOfBirth: "",
        contact: "",
        emergencyContact: "",
        address: "",
        bloodGroup: "",
        recommendedDoctor: "",
        createdDate: date,
        createdTime: time,
      });
      navigate('/');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Admit Patient
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Patient ID"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
            error={!!errors.patientId}
            helperText={errors.patientId}
          />
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
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
            required
            error={!!errors.age}
            helperText={errors.age}
          />
          <TextField
            fullWidth
            select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            error={!!errors.gender}
            helperText={errors.gender}
          >
            {genders.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            error={!!errors.dateOfBirth}
            helperText={errors.dateOfBirth}
          />
          <TextField
            fullWidth
            select
            label="Blood Group"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            error={!!errors.bloodGroup}
            helperText={errors.bloodGroup}
          >
            {bloodGroups.map((group) => (
              <MenuItem key={group} value={group}>
                {group}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Contact Number"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            error={!!errors.contact}
            helperText={errors.contact}
          />
          <TextField
            fullWidth
            label="Emergency Contact"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
          />
        </Box>

        <TextField
          fullWidth
          label="Address"
          name="address"
          multiline
          rows={3}
          value={formData.address}
          onChange={handleChange}
          margin="normal"
          required
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
          required
          error={!!errors.recommendedDoctor}
          helperText={errors.recommendedDoctor}
        >
          {doctors.map((doctor) => (
            <MenuItem
              key={doctor.name}
              value={`${doctor.name} - ${doctor.specialization}`}
            >
              {doctor.name} ({doctor.specialization})
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Created Date"
            name="createdDate"
            value={formData.createdDate}
            InputProps={{ readOnly: true }}
          />
          <TextField
            fullWidth
            label="Created Time"
            name="createdTime"
            value={formData.createdTime}
            InputProps={{ readOnly: true }}
          />
        </Box>

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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          fullWidth
        >
          Admit
        </Button>
      </Box>
    </Paper>
  );
};

export default AddNewPatient;
