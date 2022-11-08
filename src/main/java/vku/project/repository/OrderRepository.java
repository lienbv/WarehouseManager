package vku.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vku.project.entity.Orders;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Orders,Integer> {

    List<Orders> findAllByAccount_Account(String account);
    @Query("select o from Orders o " +
            "where o.orderDate between :startDate and :endDate")
    List<Orders> getList(@Param("startDate") Date startDate,@Param("endDate") Date endDate);
}
