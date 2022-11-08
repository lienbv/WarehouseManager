package vku.project.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vku.project.entity.OrderProduct;

import java.util.List;

public interface OrderProductService {
    void save (OrderProduct orderProduct);
    List<OrderProduct> findAll(String account);
    Page<OrderProduct> findAllOrder(Pageable pageable);
    Page<OrderProduct> search(String key, Pageable pageable);
    OrderProduct findById(int id);
    void delete (Integer id);
}
