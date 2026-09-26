# Employee Management System

[![CI](https://github.com/rahulmaity0/employee-management-system/actions/workflows/ci.yml/badge.svg)](https://github.com/rahulmaity0/employee-management-system/actions/workflows/ci.yml)

A full-stack CRUD application for managing employee records, with a Spring Boot REST API and a React front end.

## Features

- Add, edit, delete and list employees (name, age, salary, hometown)
- Live employee count
- React UI talking to the API with Axios

## API

| Method | Path | Description |
|---|---|---|
| GET | `/api/employees` | All employees |
| GET | `/api/employees/{id}` | One employee |
| POST | `/api/employees` | Create an employee |
| PUT | `/api/employees/{id}` | Update an employee |
| DELETE | `/api/employees/{id}` | Delete an employee |
| GET | `/api/employees/count` | Number of employees |

## Tech stack

| Layer | Stack |
|---|---|
| Backend | Java 17, Spring Boot 4, Spring Data JPA, H2 |
| Frontend | React, Axios |

## Running locally

```bash
# backend – http://localhost:8080
cd Employee-Management
./mvnw spring-boot:run

# frontend – http://localhost:3000
cd employee-frontend
npm install
npm start
```
