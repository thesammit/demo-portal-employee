package com.socgen.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.socgen.dto.EmployeeDTO;
import com.socgen.entity.Employee;
import com.socgen.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {
	
	@Autowired
	private EmployeeRepository employeeRepo;
	
	@Override
	public List<EmployeeDTO> getEmployees() {
		List<Employee> employees = employeeRepo.findAll();
		List<EmployeeDTO> employeeList = new ArrayList<>();
		employees.forEach(emp -> {
			EmployeeDTO emplDTO = new EmployeeDTO();
			BeanUtils.copyProperties(emp, emplDTO);
			employeeList.add(emplDTO);
		});
		
		return employeeList;
	}
	
	@Override
	public EmployeeDTO addAndUpdateEmployee(EmployeeDTO employeeData) {
		Employee employee = new Employee();
		BeanUtils.copyProperties(employeeData, employee);
		employee = employeeRepo.save(employee);
		BeanUtils.copyProperties(employee, employeeData);
		return employeeData;
	}

	@Override
	public EmployeeDTO deleteEmployee(Integer employeeId) {
		try {
			Employee employee = employeeRepo.getOne(employeeId);
			EmployeeDTO emplDTO = new EmployeeDTO();
			BeanUtils.copyProperties(employee, emplDTO);
			employeeRepo.deleteById(employeeId);
			return emplDTO;
		} catch(IllegalArgumentException ex) {
			ex.getMessage();
			return null;			
		}
	}
}
