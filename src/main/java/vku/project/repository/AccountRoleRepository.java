package vku.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vku.project.entity.Account;
import vku.project.entity.AccountRole;
import vku.project.entity.AccountRoleKey;

import java.util.List;

@Repository
public interface AccountRoleRepository extends JpaRepository<AccountRole, AccountRoleKey> {
    List<AccountRole> findAllByAccount(Account account);
}

