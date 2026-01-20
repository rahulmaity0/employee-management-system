import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:8080/api/employees';

function App() {
  const [employees, setEmployees] = useState([]);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    salary: '',
    hometown: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all employees when component loads
  useEffect(() => {
    fetchEmployees();
    fetchEmployeeCount();
  }, []);

  // Get all employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API_URL);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Error fetching employees. Make sure Spring Boot is running!');
    }
  };

  // Get employee count
  const fetchEmployeeCount = async () => {
    try {
      const response = await axios.get(`${API_URL}/count`);
      setEmployeeCount(response.data);
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Add or Update employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        // Update existing employee
        await axios.put(`${API_URL}/${editingId}`, formData);
        alert('Employee updated successfully!');
        setEditingId(null);
      } else {
        // Add new employee
        await axios.post(API_URL, formData);
        alert('Employee added successfully!');
      }
      
      // Reset form and refresh list
      setFormData({ name: '', age: '', salary: '', hometown: '' });
      fetchEmployees();
      fetchEmployeeCount();
    } catch (error) {
      console.error('Error saving employee:', error);
      alert('Error saving employee!');
    }
  };

  // Delete employee
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert('Employee deleted successfully!');
        fetchEmployees();
        fetchEmployeeCount();
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Error deleting employee!');
      }
    }
  };

  // Edit employee (populate form)
  const handleEdit = (employee) => {
    setFormData({
      name: employee.name,
      age: employee.age,
      salary: employee.salary,
      hometown: employee.hometown
    });
    setEditingId(employee.id);
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData({ name: '', age: '', salary: '', hometown: '' });
    setEditingId(null);
  };

  return (
    <div className="App">
      <h1>Employee Management System</h1>
      
      <div className="stats">
        <h3>Total Employees: {employeeCount}</h3>
      </div>

      {/* Add/Edit Employee Form */}
      <div className="form-container">
        <h2>{editingId ? 'Edit Employee' : 'Add New Employee'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="hometown"
            placeholder="Hometown"
            value={formData.hometown}
            onChange={handleInputChange}
            required
          />
          <div className="button-group">
            <button type="submit">
              {editingId ? 'Update Employee' : 'Add Employee'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Employee List */}
      <div className="employee-list">
        <h2>Employee List</h2>
        {employees.length === 0 ? (
          <p>No employees found. Add your first employee!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Salary</th>
                <th>Hometown</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.age}</td>
                  <td>${employee.salary.toLocaleString()}</td>
                  <td>{employee.hometown}</td>
                  <td>
                    <button onClick={() => handleEdit(employee)} className="edit-btn">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(employee.id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;