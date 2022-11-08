package vku.project.dto;

import javax.validation.constraints.NotNull;
import java.util.Date;

public class DtoEmployee {
    private String id;
    @NotNull
    private String nameEmployee;
    @NotNull
    private String dateOfBirth;
    @NotNull
    private String idCard;
    @NotNull
    private double salary;
    @NotNull
    private String phoneNumber;
    @NotNull
    private String email;
    @NotNull
    private String address;
    @NotNull
    private String level;
    @NotNull
    private String avatar;
    private int positionId;

    public DtoEmployee() {
    }



    public DtoEmployee(String id, @NotNull String nameEmployee, @NotNull String dateOfBirth, @NotNull String idCard, @NotNull double salary, @NotNull String phoneNumber, @NotNull String email, @NotNull String address, @NotNull String level, @NotNull String avatar, int positionId) {
        this.id = id;
        this.nameEmployee = nameEmployee;
        this.dateOfBirth = dateOfBirth;
        this.idCard = idCard;
        this.salary = salary;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.address = address;
        this.level = level;
        this.avatar = avatar;
        this.positionId = positionId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNameEmployee() {
        return nameEmployee;
    }

    public void setNameEmployee(String nameEmployee) {
        this.nameEmployee = nameEmployee;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public int getPositionId() {
        return positionId;
    }

    public void setPositionId(int positionId) {
        this.positionId = positionId;
    }

}
