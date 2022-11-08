package vku.project.dto;

import java.util.Date;

public class DtoAccount {
    private String account;
    private String password;
    private Date dateCreate;
    private String customerId;

    public DtoAccount(String account, String password, Date dateCreate, String customerId) {
        this.account = account;
        this.password = password;
        this.dateCreate = dateCreate;
        this.customerId = customerId;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getDateCreate() {
        return dateCreate;
    }

    public void setDateCreate(Date dateCreate) {
        this.dateCreate = dateCreate;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }
}
