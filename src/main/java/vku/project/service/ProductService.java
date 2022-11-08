package vku.project.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vku.project.dto.DtoProduct;
import vku.project.entity.Product;

import java.util.List;


public interface ProductService {
    Page<Product> finAll(Pageable pageable);
    List<Product> findAllListProduct();
    Product findById(String id);
    void saveProduct(DtoProduct product);
    void updateProduct(DtoProduct product);
    void delete(String id);
    List<Product> searchListProduct(String name);
    Page<Product> searchByCategory(String name, Pageable pageable);
}
