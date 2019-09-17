package com.socgen.service;

import java.util.List;

import com.socgen.dto.EmployeeDTO;

public interface EmployeeService {
	public EmployeeDTO addAndUpdateEmployee(EmployeeDTO employee);

	public List<EmployeeDTO> getEmployees();

	public EmployeeDTO deleteEmployee(Integer employeeId);
}
