import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  Chip,
} from '@mui/material';

const colors = {
  primary: '#2A5C99',
  softGreen: '#7CB342',
  darkGray: '#333333',
  lightGray: '#F5F5F5',
};

const PatientCard = ({ patient }) => {
  if (!patient) return null;

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', p: 2, backgroundColor: colors.lightGray }}>
      <CardContent>
        <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 'bold', mb: 2 }}>
          {patient.fullName}
        </Typography>

        <Stack spacing={1} divider={<Divider flexItem />}>
          <Typography><strong>Patient ID:</strong> {patient.patientId}</Typography>
          <Typography><strong>Age:</strong> {patient.age}</Typography>
          <Typography><strong>Gender:</strong> {patient.gender}</Typography>
          <Typography><strong>Date of Birth:</strong> {patient.dateOfBirth}</Typography>
          <Typography><strong>Contact:</strong> {patient.contact}</Typography>
          <Typography><strong>Emergency Contact:</strong> {patient.emergencyContact || 'N/A'}</Typography>
          <Typography><strong>Address:</strong> {patient.address}</Typography>
          <Typography>
            <strong>Blood Group:</strong>{' '}
            <Chip label={patient.bloodGroup} color="success" size="small" />
          </Typography>
          <Typography><strong>Recommended Doctor:</strong> {patient.recommendedDoctor}</Typography>
          <Typography><strong>Patient Admit Type:</strong> {patient.patientAdmitType || 'N/A'}</Typography>
          <Typography><strong>Created Date:</strong> {patient.createdDate}</Typography>
          <Typography><strong>Created Time:</strong> {patient.createdTime}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
