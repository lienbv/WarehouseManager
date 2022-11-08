package vku.project.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
public class Customers {
    @Id
    private String idCustomer;
    @NotNull
    private String nameCustomer;
    @NotNull
    private String phone;
    @NotNull
    private String email;
    @NotNull
    private String idCard;
    @NotNull
    private String address;

    @OneToOne(mappedBy = "customer",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Account account;
    public Customers() {
    }

    public Customers(String idCustomer, String nameCustomer, String phone, String email, String idCard, String address, Set<Orders> orders) {
        this.idCustomer = idCustomer;
        this.nameCustomer = nameCustomer;
        this.phone = phone;
        this.email = email;
        this.idCard = idCard;
        this.address = address;

    }

    public Customers(String idCustomer, @NotNull String nameCustomer, @NotNull String phone, @NotNull String email, @NotNull String idCard, @NotNull String address, Account account) {
        this.idCustomer = idCustomer;
        this.nameCustomer = nameCustomer;
        this.phone = phone;
        this.email = email;
        this.idCard = idCard;
        this.address = address;
        this.account = account;
    }

    public Customers(String idCustomer, @NotNull String nameCustomer, @NotNull String phone, @NotNull String email, @NotNull String idCard, @NotNull String address) {
        this.idCustomer = idCustomer;
        this.nameCustomer = nameCustomer;
        this.phone = phone;
        this.email = email;
        this.idCard = idCard;
        this.address = address;
    }


    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public String getIdCustomer() {
        return idCustomer;
    }

    public void setIdCustomer(String idCustomer) {
        this.idCustomer = idCustomer;
    }

    public String getNameCustomer() {
        return nameCustomer;
    }

    public void setNameCustomer(String nameCustomer) {
        this.nameCustomer = nameCustomer;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


}
