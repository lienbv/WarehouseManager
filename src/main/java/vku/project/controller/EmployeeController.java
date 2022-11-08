package vku.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vku.project.dto.DtoEmployee;
import vku.project.entity.Employee;
import vku.project.entity.Position;
import vku.project.service.EmployeeService;
import vku.project.service.PositionService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/employee")
@CrossOrigin("http://localhost:4200")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private PositionService positionService;

    @GetMapping("/position")
    public ResponseEntity<List<Position>> listPosition() {
        List<Position> positionList = this.positionService.finAll();
        if (positionList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(positionList, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<Page<Employee>> listEmployee(@PageableDefault(size = 5) Pageable pageable) {
        Page<Employee> employees = this.employeeService.finAll(pageable);
        if (employees == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/getInformation/{id}")
    public ResponseEntity<Employee> getInforEmployee(@PathVariable String id) {
        Employee employee = employeeService.findById(id);
        if (employee == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Employee> createEmployee(@Valid @RequestBody DtoEmployee employee, BindingResult bindingResult) {
        System.out.println();
        if (!bindingResult.hasFieldErrors()) {
            this.employeeService.saveEmployee(employee);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);

    }

    @PutMapping("/edit")
    public ResponseEntity<Employee> editEmployee(@Valid @RequestBody DtoEmployee employee, BindingResult bindingResult) {

        if (!bindingResult.hasFieldErrors()) {
           this.employeeService.updateEmployee(employee);
           return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Employee> deleteEmployee(@PathVariable String id) {
        Employee employee = employeeService.findById(id);
        if (employee == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        employeeService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/search")
    public ResponseEntity<Page<Employee>> searchEmployee(@RequestParam("key") String name, @PageableDefault(size = 5) Pageable pageable){
        Page<Employee> employees = this.employeeService.seacrhEmployee(name, pageable);
        if (employees.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else {
            return new ResponseEntity<>(employees,HttpStatus.OK);
        }
    }
}
