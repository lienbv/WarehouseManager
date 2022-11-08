package vku.project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;

@Entity
public class CodeProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int code;
    @ManyToOne
    @JoinColumn(name = "productId")
    @JsonIgnore
    private Product product;
    @ManyToOne()
    @JoinColumn(name = "status_id")
    private Status status;
    public CodeProduct() {
    }

    public CodeProduct(int code, Product product, Status status) {
        this.code = code;
        this.product = product;
        this.status = status;
    }

    public CodeProduct(int id, Product product) {
        this.id = id;
        this.product = product;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
