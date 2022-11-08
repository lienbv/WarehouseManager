package vku.project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
public class StatusContract {
    @Id
    private int idStatus;
    private String status;
    @OneToMany(mappedBy = "statusContract")
    @JsonIgnore
    private Set<Orders> orders;

    public StatusContract() {
    }

    public StatusContract(int idStatus, String status, Set<Orders> orders) {
        this.idStatus = idStatus;
        this.status = status;
        this.orders = orders;
    }

    public StatusContract(int idStatus, String status) {
        this.idStatus = idStatus;
        this.status = status;
    }

    public StatusContract(int idStatus) {
        this.idStatus = idStatus;
    }

    public int getIdStatus() {
        return idStatus;
    }

    public void setIdStatus(int idStatus) {
        this.idStatus = idStatus;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Set<Orders> getOrders() {
        return orders;
    }

    public void setOrders(Set<Orders> orders) {
        this.orders = orders;
    }
}
