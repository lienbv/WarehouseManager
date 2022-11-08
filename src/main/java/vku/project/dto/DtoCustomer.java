package vku.project.dto;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class DtoCustomer {
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
    @NotNull
    private String account;
    @NotNull
    private String passwork;

    public DtoCustomer() {
    }

    public DtoCustomer(String idCustomer, @NotNull String nameCustomer, @NotNull String phone, @NotNull String email, @NotNull String idCard, @NotNull String address, @NotNull String account, @NotNull String passwork) {
        this.idCustomer = idCustomer;
        this.nameCustomer = nameCustomer;
        this.phone = phone;
        this.email = email;
        this.idCard = idCard;
        this.address = address;
        this.account = account;
        this.passwork = passwork;
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

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPasswork() {
        return passwork;
    }

    public void setPasswork(String passwork) {
        this.passwork = passwork;
    }
}
