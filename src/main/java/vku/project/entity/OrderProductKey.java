package vku.project.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class OrderProductKey implements Serializable {
    @Column(name = "productId")
    private String productId;
    @Column(name = "orderId")
    private int ordersId;

    public OrderProductKey() {
    }

    public OrderProductKey(String productId, int ordersId) {
        this.productId = productId;
        this.ordersId = ordersId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public int getOrdersId() {
        return ordersId;
    }

    public void setOrdersId(int ordersId) {
        this.ordersId = ordersId;
    }
}
