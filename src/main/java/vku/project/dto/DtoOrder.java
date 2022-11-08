package vku.project.dto;

import vku.project.entity.Product;

import java.util.List;

public class DtoOrder {
    private int ordersId;
    private List<DtoProduct> idProduct;
    private String account;
    private String userName;
    private String address;
    private String phone;
    private Integer total;


    public DtoOrder() {
    }

    public int getOrdersId() {
        return ordersId;
    }

    public void setOrdersId(int ordersId) {
        this.ordersId = ordersId;
    }

    public DtoOrder(int ordersId, List<DtoProduct> idProduct, String account) {
        this.ordersId = ordersId;
        this.idProduct = idProduct;
        this.account = account;
    }

    public DtoOrder(int ordersId, List<DtoProduct> idProduct, String account, String userName, String address, String phone, Integer total) {
        this.ordersId = ordersId;
        this.idProduct = idProduct;
        this.account = account;
        this.userName = userName;
        this.address = address;
        this.phone = phone;
        this.total = total;
    }



    public List<DtoProduct> getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(List<DtoProduct> idProduct) {
        this.idProduct = idProduct;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
