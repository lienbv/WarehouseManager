package vku.project.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vku.project.entity.Customers;
import vku.project.entity.Employee;

@Repository
public interface CustomerRepository extends JpaRepository<Customers, String> {
    @Query("select c " +
            "from Customers c " +
            "inner join Account a on a.account = c.account.account " +
            "where c.idCustomer like %:key% " +
            "or c.nameCustomer like %:key% " +
            "or c.email like %:key% " +
            "or c.idCard like %:key% " +
            "or c.address like %:key% " +
            "or a.account like %:key% ")
    Page<Customers> searchCustomer(@Param("key") String name, Pageable pageable);

    @Query("select c.idCustomer,c.nameCustomer,c.email,c.idCard,c.address,a.account \n" +
            "from Customers c \n" +
            "inner join Account a on a.customer.idCustomer = c.idCustomer \n" +
            "group by c.idCustomer")
    Page<Customers> showListCustomer(Pageable pageable);
    Customers findCustomersByAccount_Account(String account);
}
