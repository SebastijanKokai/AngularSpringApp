package rva.ctrls;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;

@RestController
@Api(tags = {"Test kontroler - ima i kalkulator u sebi"})
public class HelloWorldController {
	
	@RequestMapping("/")
	public String HelloWorld() {
		return "Hello World";
	}
	
	@RequestMapping("/calculate")
	public String Calculate() {
		long x = Math.round(Math.random() * 100);
		long y = Math.round(Math.random() * 100);
		
		return x + " + " + y + " = " + (x+y);
	}


}
