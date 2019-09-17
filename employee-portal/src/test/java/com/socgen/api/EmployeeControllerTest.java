package com.socgen.api;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.nio.charset.Charset;
import java.util.Arrays;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.internal.exceptions.util.ScenarioPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.socgen.dto.EmployeeDTO;
import com.socgen.service.EmployeeService;

@RunWith(SpringRunner.class)
@WebMvcTest(value = EmployeeController.class)
public class EmployeeControllerTest {
	@Autowired
	private MockMvc mockMvc;
	@MockBean
	private EmployeeService employeeService;
	public static final MediaType APPLICATION_JSON_UTF8 = new MediaType(MediaType.APPLICATION_JSON.getType(),
			MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

	@Test
	public void getEmployessTest() throws Exception {
		EmployeeDTO first = new EmployeeDTO();
		first.setEmployeeId(101);
		first.setFirstName("Debanjan");
		EmployeeDTO second = new EmployeeDTO();
		second.setFirstName("Soham");
		second.setEmployeeId(102);
		when(employeeService.getEmployees()).thenReturn(Arrays.asList(first, second));
		RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/employees").accept(MediaType.APPLICATION_JSON);

		ResultActions result = mockMvc.perform(requestBuilder);

		result.andExpect(status().isOk()).andExpect(content().contentType(APPLICATION_JSON_UTF8))
				.andExpect(jsonPath("$[0].employeeId", is(101))).andExpect(jsonPath("$[0].firstName", is("Debanjan")))
				.andExpect(jsonPath("$[1].employeeId", is(102))).andExpect(jsonPath("$[1].firstName", is("Soham")));

		verify(employeeService, times(1)).getEmployees();
		verifyNoMoreInteractions(employeeService);
	}
}
