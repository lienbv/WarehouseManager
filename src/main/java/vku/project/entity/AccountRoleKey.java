package vku.project.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class AccountRoleKey implements Serializable {
    @Column(name = "userName")
    private String account;
    @Column(name = "role_id")
    private Integer idRole;

    public AccountRoleKey() {
    }

    public AccountRoleKey(String account, Integer idRole) {
        this.account = account;
        this.idRole = idRole;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public Integer getIdRole() {
        return idRole;
    }

    public void setIdRole(Integer idRole) {
        this.idRole = idRole;
    }
}
