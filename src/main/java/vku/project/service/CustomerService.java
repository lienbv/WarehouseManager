package vku.project.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import vku.project.dto.DtoCustomer;
import vku.project.entity.Account;
import vku.project.entity.Customers;

import javax.mail.MessagingException;
import java.util.List;


public interface CustomerService {
    Page<Customers> finAll(Pageable pageable);
    Customers findById(String id);
    Customers findCustomerByAccount(String account);
    void saveCustomer(DtoCustomer customers);
    void updateCustomer(DtoCustomer customers);
    void delete(String id);
    Page<Customers> searchCustomer(String name, Pageable pageable);
    List<Account> finAllAccount();
    Account getAccountByIdCustomer(String id);
}
