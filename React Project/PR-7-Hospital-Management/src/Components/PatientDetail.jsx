import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStorageData } from '../utils/PatientData';
import PatientCard from './PatientCard';

const PatientDetail = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const patients = getStorageData();
    const found = patients.find((p) => p.patientId === id);
    setPatient(found);
  }, [id]);

  return (
    <div>
      {patient ? (
        <PatientCard patient={patient} />
      ) : (
        <div>Patient not found.</div>
      )}
    </div>
  );
};

export default PatientDetail;
