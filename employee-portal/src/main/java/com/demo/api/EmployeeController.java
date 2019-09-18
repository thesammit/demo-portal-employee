package com.demo.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.demo.dto.EmployeeDTO;
import com.demo.service.EmployeeService;

@CrossOrigin
@RestController
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;

	@GetMapping(value = "/employees")
	public ResponseEntity<List<EmployeeDTO>> getEmployees() {
		return new ResponseEntity<List<EmployeeDTO>>(employeeService.getEmployees(), HttpStatus.OK);
	}
	
	@PostMapping(value = "/employee")
	public ResponseEntity<EmployeeDTO> addEmployee(@RequestBody EmployeeDTO employee) {
		return new ResponseEntity<EmployeeDTO>(employeeService.addAndUpdateEmployee(employee), HttpStatus.OK);
	}
	
	@PutMapping(value = "/employee")
	public ResponseEntity<EmployeeDTO> updateEmployee(@RequestBody EmployeeDTO employee) {
		return new ResponseEntity<EmployeeDTO>(employeeService.addAndUpdateEmployee(employee), HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/employee/{employeeId}")
	public ResponseEntity<EmployeeDTO> deleteEmployee(@PathVariable("employeeId") Integer employeeId) {
		return new ResponseEntity<EmployeeDTO>(employeeService.deleteEmployee(employeeId), HttpStatus.OK);
	}

}
