package vku.project.service;

import vku.project.dto.DtoAccount;
import vku.project.entity.Account;

public interface AccountService {
    Account findById(String userName);
    void save(Account account);
    void changePassWord(DtoAccount account);
}
