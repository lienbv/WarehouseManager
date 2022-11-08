package vku.project.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Product {
    @Id
    private String productId;
    @NotNull
    private String productName;
    @NotNull
    private int productQuantity;
    @NotNull
    private double productPrice;
    @NotNull
    private String productImage;
    @NotNull
    private String detail;
    @NotNull
    private String trademark;


    @ManyToOne(targetEntity = Categories.class)
    @JoinColumn(name = "categoryId")

    private Categories categories;

    @ManyToOne(targetEntity = Account.class)
    @JoinColumn(name = "accountsId")
    @JsonBackReference
    private Set<Account> account;

//    @ManyToMany
//    @JoinTable(name = "order_details", joinColumns = @JoinColumn(name = "productId"),
//            inverseJoinColumns = @JoinColumn(name = "ordersId"))
//    @JsonBackReference
//    private List<Orders> orders;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonBackReference
    private Set<CodeProduct> codeProducts = new LinkedHashSet<>();

    public void generateCode(CodeProduct codeProduct){
        codeProducts.add(codeProduct);
    }
    public Product() {
    }

//    public Product(String productId, @NotNull String productName, @NotNull int productQuantity, @NotNull double productPrice, @NotNull String detail, @NotNull String productImage, Categories categories,  Set<Account> account, List<Orders> orders, Set<CodeProduct> codeProducts) {
//        this.productId = productId;
//        this.productName = productName;
//        this.productQuantity = productQuantity;
//        this.productPrice = productPrice;
//        this.detail = detail;
//        this.productImage = productImage;
//        this.categories = categories;
//
//        this.account = account;
//        this.orders = orders;
//        this.codeProducts = codeProducts;
//    }


    public Product(String productId, @NotNull String productName, @NotNull int productQuantity, @NotNull double productPrice, @NotNull String productImage, @NotNull String detail, @NotNull String trademark, Categories categories) {
        this.productId = productId;
        this.productName = productName;
        this.productQuantity = productQuantity;
        this.productPrice = productPrice;
        this.productImage = productImage;
        this.detail = detail;
        this.trademark = trademark;
        this.categories = categories;
    }

//    public Product(String productId, @NotNull String productName, @NotNull int productQuantity, @NotNull double productPrice, @NotNull String productImage, Categories categories, Set<Account> account, List<Orders> orders, Set<CodeProduct> codeProducts) {
//        this.productId = productId;
//        this.productName = productName;
//        this.productQuantity = productQuantity;
//        this.productPrice = productPrice;
//        this.productImage = productImage;
//        this.categories = categories;
//        this.account = account;
//        this.orders = orders;
//        this.codeProducts = codeProducts;
//    }
//
//    public Product(String productId, @NotNull String productName, @NotNull int productQuantity, @NotNull double productPrice, @NotNull String detail, @NotNull String trademark, @NotNull String productImage, Categories categories, Set<Account> account, List<Orders> orders, Set<CodeProduct> codeProducts) {
//        this.productId = productId;
//        this.productName = productName;
//        this.productQuantity = productQuantity;
//        this.productPrice = productPrice;
//        this.detail = detail;
//        this.trademark = trademark;
//        this.productImage = productImage;
//        this.categories = categories;
//        this.account = account;
//        this.orders = orders;
//        this.codeProducts = codeProducts;
//    }

    public String getTrademark() {
        return trademark;
    }

    public void setTrademark(String trademark) {
        this.trademark = trademark;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(int productQuantity) {
        this.productQuantity = productQuantity;
    }

    public double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(double productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

    public Categories getCategories() {
        return categories;
    }

    public void setCategories(Categories categories) {
        this.categories = categories;
    }


    public Set<Account> getAccount() {
        return account;
    }

    public void setAccount(Set<Account> account) {
        this.account = account;
    }
//
//    public List<Orders> getOrders() {
//        return orders;
//    }
//
//    public void setOrders(List<Orders> orders) {
//        this.orders = orders;
//    }

    public Set<CodeProduct> getCodeProducts() {
        return codeProducts;
    }

    public void setCodeProducts(Set<CodeProduct> codeProducts) {
        this.codeProducts = codeProducts;
    }
//
//    @Override
//    public String toString() {
//        return "Product{" +
//                "productId='" + productId + '\'' +
//                ", productName='" + productName + '\'' +
//                ", productQuantity=" + productQuantity +
//                ", productPrice=" + productPrice +
//                ", productImage='" + productImage + '\'' +
//                ", detail='" + detail + '\'' +
//                ", trademark='" + trademark + '\'' +
//                ", categories=" + categories +
//                ", account=" + account +
//                ", orders=" + orders +
//                ", codeProducts=" + codeProducts +
//                '}';
//    }
}
