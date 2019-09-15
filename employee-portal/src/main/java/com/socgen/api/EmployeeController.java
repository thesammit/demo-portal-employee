package com.socgen.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.socgen.entity.Employee;
import com.socgen.service.EmployeeService;

@CrossOrigin
@RestController
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;

	@GetMapping(value = "/employees")
	public ResponseEntity<List<Employee>> getEmployees() {
		return new ResponseEntity<List<Employee>>(employeeService.getEmployees(), HttpStatus.OK);
	}
	
	@PostMapping(value = "/employee")
	public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
		return new ResponseEntity<Employee>(employeeService.addEmployee(employee), HttpStatus.OK);
	}

}
