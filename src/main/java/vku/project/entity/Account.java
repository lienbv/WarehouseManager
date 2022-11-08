package vku.project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
public class Account {
    @Id
    private String account;
    private String password;
    private Date dateCreate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn( name="customer_id")
    @JsonIgnore
    private Customers customer;

    @OneToMany(mappedBy = "account")
    @JsonIgnore
    private Set<Orders> orders;
    @OneToMany(mappedBy = "account")
    @JsonIgnore
    List<Product> products;
    public Account() {
    }

    public Account( String account, String password, Date dateCreate, Customers customers) {
        this.account = account;
        this.password = password;
        this.dateCreate = dateCreate;
        this.customer = customers;

    }

    public Account(String account, String password, Date dateCreate) {
        this.account = account;
        this.password = password;
        this.dateCreate = dateCreate;
    }

    public Account( String account, String password, Date dateCreate, Customers customers, List<Product> products) {
        this.account = account;
        this.password = password;
        this.dateCreate = dateCreate;
        this.customer = customers;
        this.products = products;
    }


    public Customers getCustomer() {
        return customer;
    }

    public void setCustomer(Customers customer) {
        this.customer = customer;
    }

    public Set<Orders> getOrders() {
        return orders;
    }

    public void setOrders(Set<Orders> orders) {
        this.orders = orders;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
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

    public Customers getCustomers() {
        return customer;
    }

    public void setCustomers(Customers customers) {
        this.customer = customers;
    }
}
