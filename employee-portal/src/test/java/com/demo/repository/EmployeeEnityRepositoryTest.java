package com.demo.repository;

import static org.junit.Assert.assertEquals;

import java.io.File;
import java.io.FileInputStream;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.ResourceUtils;

import com.demo.entity.Employee;
import com.demo.repository.EmployeeRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@DataJpaTest
public class EmployeeEnityRepositoryTest {
	
	private List<Employee> employees;
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private EmployeeRepository empReporitory;
	
	@Before
	public void setup() throws Exception {
		File employeeJson = ResourceUtils.getFile("classpath:Employee.json");
		ObjectMapper mapper = new ObjectMapper();
		employees = mapper.readValue(new FileInputStream(employeeJson), new TypeReference<List<Employee>>(){});
	}

	
	@Test
	public void when_getEmployees_thenReturnEmployeeList() {
	    // given
		for(Employee employee: employees) {
			Employee emp = new Employee();
			emp.setEmployeeId(employee.getEmployeeId());
			emp.setFirstName(employee.getFirstName());
			emp.setLastName(employee.getLastName());
			emp.setGender(employee.getGender());
			emp.setDateOfBirth(employee.getDateOfBirth());
			emp.setDepartment(employee.getDepartment());
			entityManager.merge(employee);
			entityManager.flush();
		}
	    
	    Optional<Employee> found = empReporitory.findById(1);
	    assertEquals(true, found.isPresent());
	    if(found.isPresent())
	    	assertEquals("Test1", found.get().getFirstName());
	}

}
