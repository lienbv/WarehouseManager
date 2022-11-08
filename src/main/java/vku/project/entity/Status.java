package vku.project.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String status;
    @OneToMany(mappedBy = "status")
    private Set<CodeProduct> codeAvailableSet;

    public Status() {
    }

    public Status(Integer id) {
        this.id = id;
    }

    public Status(Integer id, String status, Set<CodeProduct> codeAvailableSet) {
        this.id = id;
        this.status = status;
        this.codeAvailableSet = codeAvailableSet;
    }

    public Status(Integer id, String status) {
        this.id = id;
        this.status = status;
    }

    public Status(String status, Set<CodeProduct> codeAvailableSet) {
        this.status = status;
        this.codeAvailableSet = codeAvailableSet;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Set<CodeProduct> getCodeAvailableSet() {
        return codeAvailableSet;
    }

    public void setCodeAvailableSet(Set<CodeProduct> codeAvailableSet) {
        this.codeAvailableSet = codeAvailableSet;
    }
}
