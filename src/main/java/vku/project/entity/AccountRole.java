package vku.project.entity;

import javax.persistence.*;

@Entity
public class AccountRole {
    @EmbeddedId
    private AccountRoleKey id;
    @ManyToOne()
    @MapsId("account")
    @JoinColumn(name = "account")
    private Account account;
    @ManyToOne()
    @MapsId("idRole")
    @JoinColumn(name = "id_role")
    private Role role;

    public AccountRole() {
    }

    public AccountRole(AccountRoleKey id, Account account, Role role) {
        this.id = id;
        this.account = account;
        this.role = role;
    }

    public AccountRoleKey getId() {
        return id;
    }

    public void setId(AccountRoleKey id) {
        this.id = id;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
