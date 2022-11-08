package vku.project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vku.project.entity.AccountRole;
import vku.project.repository.AccountRoleRepository;
import vku.project.service.AccountRoleService;

@Service
public class AccountRoleServiceImpl implements AccountRoleService {
    @Autowired
    private AccountRoleRepository accountRoleRepository;
    @Override
    public void save(AccountRole accountRole) {
     this.accountRoleRepository.save(accountRole);
    }
}
