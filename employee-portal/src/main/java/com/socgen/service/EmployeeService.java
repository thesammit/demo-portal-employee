package com.socgen.service;

import java.util.List;

import com.socgen.entity.Employee;

public interface EmployeeService {
	public Employee addEmployee(Employee employee);
	public List<Employee> getEmployees();
}
