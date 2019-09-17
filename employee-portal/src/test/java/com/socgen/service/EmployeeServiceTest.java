package com.socgen.service;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.io.File;
import java.io.FileInputStream;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.util.ResourceUtils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.socgen.dto.EmployeeDTO;
import com.socgen.entity.Employee;
import com.socgen.repository.EmployeeRepository;

@RunWith(SpringRunner.class)
public class EmployeeServiceTest {

	@TestConfiguration
    static class EmployeeServiceImplTestConfig {
  
        @Bean
        public EmployeeService employeeService() {
            return new EmployeeServiceImpl();
        }
    }
	
	@Autowired
	private EmployeeService employeeService;
	
	@MockBean
	private EmployeeRepository employeeRepository;
	List<Employee> employees;
	
	@Before
	public void setup() throws Exception {
		File employeeJson = ResourceUtils.getFile("classpath:Employee.json");
		ObjectMapper mapper = new ObjectMapper();
		employees = mapper.readValue(new FileInputStream(employeeJson), new TypeReference<List<Employee>>(){});
	}
	
	@Test
	public void when_getEmployees_thenReturnEmployeeDTOList() {
		when(employeeRepository.findAll()).thenReturn(employees);
		assertEquals(employees.size(),employeeService.getEmployees().size());
	}
	
	@Test
	public void when_addAndUpdateEmployee_thenReturnEmployeeDTO() {
		when(employeeRepository.save(any(Employee.class))).thenReturn(employees.get(0));
		EmployeeDTO empDto = new EmployeeDTO();
		BeanUtils.copyProperties(employees.get(0), empDto);
		assertEquals(employees.get(0).getFirstName(), employeeService.addAndUpdateEmployee(empDto).getFirstName());
	}
	
	@Test
	public void when_deleteEmployee_thenReturnDeletedEmployeeDTO() {
		when(employeeRepository.getOne(any(Integer.class))).thenReturn(employees.get(0));
		EmployeeDTO empDto = new EmployeeDTO();
		BeanUtils.copyProperties(employees.get(0), empDto);
		assertEquals(employees.get(0).getFirstName(), employeeService.deleteEmployee(empDto.getEmployeeId()).getFirstName());
	}
}
