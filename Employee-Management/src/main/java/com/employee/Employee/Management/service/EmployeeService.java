package com.employee.Employee.Management.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.Employee.Management.model.Employee;
import com.employee.Employee.Management.repository.EmployeeRepository;

@Service
public class EmployeeService {
    
    @Autowired
    private EmployeeRepository employeeRepository;
    
    // Get all employees
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
    
    // Get employee by ID
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }
    
    // Add new employee
    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }
    
    // Update employee
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        
        employee.setName(employeeDetails.getName());
        employee.setAge(employeeDetails.getAge());
        employee.setSalary(employeeDetails.getSalary());
        employee.setHometown(employeeDetails.getHometown());
        
        return employeeRepository.save(employee);
    }
    
    // Delete employee
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
    
    // Count total employees
    public long countEmployees() {
        return employeeRepository.count();
    }
}