import React, { useEffect, useState } from 'react';
import {
  Container,
  Form,
  Button,
  Table,
  Row,
  Col,
  Modal,
  Card,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import './EmployeeManagement.css';

const getStoredEmployees = () => {
  const stored = localStorage.getItem('Employees');
  return stored ? JSON.parse(stored) : [];
};

const saveEmployees = (employees) => {
  localStorage.setItem('Employees', JSON.stringify(employees));
};

const getRandomAvatar = (seed) => {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}`;
};

const EmployeeManagement = () => {
  const initialState = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [employees, setEmployees] = useState(getStoredEmployees());
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    saveEmployees(employees);
  }, [employees]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialState);
    setIsEditing(false);
  };

  const addEmployee = (employee) => {
    const uniqueid = Math.floor(Math.random() * 100000);
    const newEmployee = {
      ...employee,
      id: uniqueid,
    };
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEditing ? updateEmployee(formData) : addEmployee(formData);
    resetForm();
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    if (formData.id === id) resetForm();
  };

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5 fw-bold text-primary">Employee Management System</h1>
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body>
          <h4 className="mb-4 text-primary">{isEditing ? 'Edit Employee' : 'Add New Employee'}</h4>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Control
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Control
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={12} className="mb-3">
                <Form.Control
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
            <div className="text-end">
              {isEditing && (
                <Button
                  variant="outline-secondary"
                  className="me-2"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              )}
              <Button type="submit" className="btn btn-primary">
                {isEditing ? 'Update' : 'Add'} Employee
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card className="shadow-sm border-0">
        <Card.Header className="bg-primary text-white fw-semibold">
          Employee List
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? (
                  employees.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.firstName}</td>
                      <td>{emp.lastName}</td>
                      <td>{emp.email}</td>
                      <td>{emp.phone}</td>
                      <td>{emp.address}</td>
                      <td className="text-end">
                        <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleView(emp)}>
                          <FaEye />
                        </Button>
                        <Button variant="outline-warning" size="sm" className="me-2" onClick={() => handleEdit(emp)}>
                          <FaEdit />
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(emp.id)}>
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <div className="text-center">
              <img
                src={getRandomAvatar(`${selectedEmployee.firstName} ${selectedEmployee.lastName}`)}
                alt="Avatar"
                className="rounded-circle mb-3"
                style={{ width: '80px', height: '80px' }}
              />
              <h5>{selectedEmployee.firstName} {selectedEmployee.lastName}</h5>
              <p><strong>Email:</strong> {selectedEmployee.email}</p>
              <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
              <p><strong>Address:</strong> {selectedEmployee.address}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmployeeManagement;
