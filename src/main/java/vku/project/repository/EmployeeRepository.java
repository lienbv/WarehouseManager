package vku.project.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vku.project.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {


    @Query("select e " +
            "from Employee e " +
            "inner join Position p on p.positionId = e.position.positionId " +
            "where e.id like %:key% " +
            "or e.nameEmployee like %:key% " +
            "or e.email like %:key% " +
            "or e.idCard like %:key% " +
            "or e.phoneNumber like %:key% " +
            "or e.dateOfBirth like %:key% " +
            "or e.salary like %:key%")
    Page<Employee> searchEmployee(@Param("key") String name, Pageable pageable);


}
