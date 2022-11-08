package vku.project.entity;

import javax.persistence.*;

@Entity
public class OrderProduct {
    @EmbeddedId
    private OrderProductKey id;
    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId("productId")
    @JoinColumn(name = "productId")
    private Product product;
    @ManyToOne(cascade = CascadeType.ALL)
    @MapsId("ordersId")
    @JoinColumn(name = "orderId")
    private Orders orders;
    private int quantity;
    public OrderProduct() {
    }

    public OrderProduct(OrderProductKey id, Product product, Orders orders) {
        this.id = id;
        this.product = product;
        this.orders = orders;
    }

    public OrderProduct(OrderProductKey id, Product product, Orders orders, int quantity) {
        this.id = id;
        this.product = product;
        this.orders = orders;
        this.quantity = quantity;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public OrderProductKey getId() {
        return id;
    }

    public void setId(OrderProductKey id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Orders getOrders() {
        return orders;
    }

    public void setOrders(Orders orders) {
        this.orders = orders;
    }
}
