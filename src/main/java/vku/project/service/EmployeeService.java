package vku.project.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vku.project.dto.DtoEmployee;
import vku.project.entity.Employee;


public interface EmployeeService {
    Page<Employee> finAll(Pageable pageable);
    Employee findById(String id);
    void saveEmployee(DtoEmployee employee);
    void updateEmployee(DtoEmployee employee);
    void delete(String id);
    Page<Employee> seacrhEmployee(String name, Pageable pageable);
}
