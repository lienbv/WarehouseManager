package vku.project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vku.project.dto.DtoEmployee;
import vku.project.entity.Employee;
import vku.project.entity.Position;
import vku.project.repository.EmployeeRepository;
import vku.project.repository.PositionRepository;
import vku.project.service.EmployeeService;
@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private PositionRepository positionRepository;

    @Override
    public Page<Employee> finAll(Pageable pageable) {
        return this.employeeRepository.findAll(pageable);
    }

    @Override
    public Employee findById(String id) {
        return this.employeeRepository.findById(id).orElse(null);
    }

    @Override
    public void saveEmployee(DtoEmployee dtoEmployee) {
        Position position = this.positionRepository.getById(dtoEmployee.getPositionId());
        Employee employee = new Employee(dtoEmployee.getId(),dtoEmployee.getNameEmployee(),dtoEmployee.getDateOfBirth(),
                dtoEmployee.getIdCard(),dtoEmployee.getSalary(),dtoEmployee.getPhoneNumber(),dtoEmployee.getEmail(),
                dtoEmployee.getAddress(),dtoEmployee.getLevel(),dtoEmployee.getAvatar(),position);
    this.employeeRepository.save(employee);
    }

    @Override
    public void updateEmployee(DtoEmployee employee) {
        Employee employee1 = this.employeeRepository.getById(employee.getId());
        Position position = this.positionRepository.getById(employee.getPositionId());

        employee1.setNameEmployee(employee.getNameEmployee());
        employee1.setDateOfBirth(employee.getDateOfBirth());
        employee1.setIdCard(employee.getIdCard());
        employee1.setSalary(employee.getSalary());
        employee1.setPhoneNumber(employee.getPhoneNumber());
        employee1.setEmail(employee.getEmail());
        employee1.setAddress(employee.getAddress());
        employee1.setLevel(employee.getLevel());
        employee1.setAvatar(employee.getAvatar());
        employee1.setPosition(position);
        this.employeeRepository.save(employee1);

    }

    @Override
    public void delete(String id) {
        this.employeeRepository.deleteById(id);
    }

    @Override
    public Page<Employee> seacrhEmployee(String name, Pageable pageable) {
        return this.employeeRepository.searchEmployee(name, pageable);
    }


}
