package com.socgen.api;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.File;
import java.io.FileInputStream;
import java.nio.charset.Charset;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.util.ResourceUtils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.socgen.dto.EmployeeDTO;
import com.socgen.service.EmployeeService;

@RunWith(SpringRunner.class)
@WebMvcTest(value = EmployeeController.class)
public class EmployeeControllerTest {
	@Autowired
	private MockMvc mockMvc;
	@MockBean
	private EmployeeService employeeService;
	private List<EmployeeDTO> emp;
	public static final MediaType APPLICATION_JSON_UTF8 = new MediaType(MediaType.APPLICATION_JSON.getType(),
			MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));
	private String requestResponseString;

	@Before
	public void setup() throws Exception {
		File employeeJson = ResourceUtils.getFile("classpath:Employee.json");
		ObjectMapper mapper = new ObjectMapper();
		emp = mapper.readValue(new FileInputStream(employeeJson), new TypeReference<List<EmployeeDTO>>(){});

		requestResponseString = mapper.writeValueAsString(emp.get(0));
	}

	@Test
	public void getEmployessTest() throws Exception {
		when(employeeService.getEmployees()).thenReturn(emp);
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/employees").accept(MediaType.APPLICATION_JSON);
		ResultActions result = mockMvc.perform(requestBuilder);
		result.andExpect(status().isOk()).andExpect(content().contentType(APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("$[0].employeeId", is(1))).andExpect(jsonPath("$[0].firstName", is("Test1")))
				.andExpect(jsonPath("$[1].employeeId", is(2))).andExpect(jsonPath("$[1].firstName", is("Test2")));

		verify(employeeService, times(1)).getEmployees();
		verifyNoMoreInteractions(employeeService);
	}

	@Test
	public void addEmployeeTest() throws Exception {
		EmployeeDTO empDto = emp.get(0);
		when(employeeService.addAndUpdateEmployee(any(EmployeeDTO.class))).thenReturn(empDto);

		RequestBuilder requestBuilder = MockMvcRequestBuilders.post("/employee").accept(MediaType.APPLICATION_JSON)
				.content(requestResponseString).contentType(MediaType.APPLICATION_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn(); 
		MockHttpServletResponse response = result.getResponse();

		assertEquals(requestResponseString, response.getContentAsString());
	}
	
	@Test
	public void updateEmployeeTest() throws Exception {
		EmployeeDTO empDto = emp.get(0);
		when(employeeService.addAndUpdateEmployee(any(EmployeeDTO.class))).thenReturn(empDto);

		RequestBuilder requestBuilder = MockMvcRequestBuilders.put("/employee").accept(MediaType.APPLICATION_JSON)
				.content(requestResponseString).contentType(MediaType.APPLICATION_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn(); 
		MockHttpServletResponse response = result.getResponse();

		assertEquals(requestResponseString, response.getContentAsString());
	}
	
	@Test
	public void deleteEmployeeTest() throws Exception {
		EmployeeDTO empDto = emp.get(0);
		when(employeeService.deleteEmployee(any())).thenReturn(empDto);

		RequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/employee/1").accept(MediaType.APPLICATION_JSON)
				.content(requestResponseString).contentType(MediaType.APPLICATION_JSON);
		MvcResult result = mockMvc.perform(requestBuilder).andReturn(); 
		MockHttpServletResponse response = result.getResponse();

		assertEquals(requestResponseString, response.getContentAsString());
	}	
}
