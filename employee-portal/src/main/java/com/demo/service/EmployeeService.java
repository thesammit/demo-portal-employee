package com.demo.service;

import java.util.List;

import com.demo.dto.EmployeeDTO;

public interface EmployeeService {
	public EmployeeDTO addAndUpdateEmployee(EmployeeDTO employee);

	public List<EmployeeDTO> getEmployees();

	public EmployeeDTO deleteEmployee(Integer employeeId);
}
