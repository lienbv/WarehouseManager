package vku.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vku.project.entity.Account;
@Repository
public interface AccountRepository extends JpaRepository<Account,String> {
    Account findByAccount(String userName);
    Account findAccountByCustomer_IdCustomer(String id);
}
