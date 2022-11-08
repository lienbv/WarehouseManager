package vku.project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int ordersId;
    @NotNull
    private Date orderDate;
    private String address;
    private String userName;
    private String phone;
    private Integer total;


//    @ManyToMany(mappedBy = "orders")
//    @JsonIgnore
//    List<Product> products;
    @ManyToOne
    @JoinColumn(name = "idStatus")
    private StatusContract statusContract;
    @ManyToOne
    @JoinColumn(name = "employeeId")
    @JsonIgnore
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "account")
    private Account account;


    public Orders() {
    }


    public Orders(int ordersId, @NotNull Date orderDate, StatusContract statusContract, Account account) {
        this.ordersId = ordersId;
        this.orderDate = orderDate;
        this.statusContract = statusContract;
        this.account = account;
    }

    public Orders(int ordersId, @NotNull Date orderDate, String address, String userName, String phone, Integer total, StatusContract statusContract, Account account) {
        this.ordersId = ordersId;
        this.orderDate = orderDate;
        this.address = address;
        this.userName = userName;
        this.phone = phone;
        this.total = total;
        this.statusContract = statusContract;
        this.account = account;
    }

    public StatusContract getStatusContract() {
        return statusContract;
    }

    public void setStatusContract(StatusContract statusContract) {
        this.statusContract = statusContract;
    }

    public int getOrdersId() {
        return ordersId;
    }

    public void setOrdersId(int ordersId) {
        this.ordersId = ordersId;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

//    public List<Product> getProducts() {
//        return products;
//    }
//
//    public void setProducts(List<Product> products) {
//        this.products = products;
//    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }


    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
