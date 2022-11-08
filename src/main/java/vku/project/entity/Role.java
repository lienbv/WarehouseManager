package vku.project.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer idRole;
    private String roleName;
    @ManyToMany
    private Set<Account> accountSet;

    public Role() {
    }

    public Role(Integer idRole, String roleName, Set<Account> accountSet) {
        this.idRole = idRole;
        this.roleName = roleName;
        this.accountSet = accountSet;
    }

    public Integer getId() {
        return idRole;
    }

    public void setId(Integer idRole) {
        this.idRole = idRole;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Set<Account> getAccountSet() {
        return accountSet;
    }

    public void setAccountSet(Set<Account> accountSet) {
        this.accountSet = accountSet;
    }
}
