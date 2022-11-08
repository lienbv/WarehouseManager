package vku.project.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vku.project.entity.Account;
import vku.project.entity.AccountRole;
import vku.project.repository.AccountRepository;
import vku.project.repository.AccountRoleRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class AccountDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountRoleRepository accRoleRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        System.out.println();
        Account account = this.accountRepository.findByAccount(userName);

        if (account == null) {
//            System.out.println("User not found! " + userName);
            throw new UsernameNotFoundException("User " + userName + " was not found in the database");
        }

//        System.out.println("Found User: " + userName);
        // [ROLE_USER, ROLE_ADMIN,..]
        List<AccountRole> roles = this.accRoleRepository.findAllByAccount(account);
        List<GrantedAuthority> grantList = new ArrayList<>();
        if (roles != null) {
            for (AccountRole role1 : roles) {
                // ROLE_USER, ROLE_ADMIN,..
                GrantedAuthority authority = new SimpleGrantedAuthority(role1.getRole().getRoleName());
                grantList.add(authority);
            }
        }

        return new User(account.getAccount(), account.getPassword(), grantList);
    }
}
