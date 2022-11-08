package vku.project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vku.project.dto.DtoProduct;
import vku.project.entity.*;
import vku.project.repository.CategoryRepository;
import vku.project.repository.ProductRepository;
import vku.project.service.CodeProductService;
import vku.project.service.ProductService;

import java.util.List;
import java.util.Random;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CodeProductService codeProductService;

    @Autowired
    private CategoryRepository categoryRepository;


    @Override
    public Page<Product> finAll(Pageable pageable) {
        return this.productRepository.findAll(pageable);
    }

    @Override
    public List<Product> findAllListProduct() {
        return this.productRepository.findAll();
    }

    @Override
    public Product findById(String id) {
        return this.productRepository.findById(id).orElse(null);
    }


    @Override
    public void saveProduct(DtoProduct product) {

        Categories categories = categoryRepository.getById(product.getCategoriesId());
        Product product1 = new Product(
                product.getProductId(), product.getProductName(), product.getProductQuantity(), product.getProductPrice(),
                product.getProductImage(), product.getDetail(), product.getTrademark(), categories);
        this.productRepository.save(product1);
        Status avaiable = new Status(1);
        for (int i = 0; i < product.getProductQuantity(); i++) {
            int n = 10000 + new Random().nextInt(90000);
            CodeProduct codeProduct = new CodeProduct(n, this.productRepository.findById(product.getProductId()).orElse(null), avaiable);
            product1.generateCode(codeProduct);
            codeProductService.save(codeProduct);
        }
        this.productRepository.save(product1);
    }

    @Override
    public void updateProduct(DtoProduct product) {
        Categories categories = this.categoryRepository.getById(product.getCategoriesId());
        Product product1 = new Product(
                product.getProductId(), product.getProductName(), product.getProductQuantity(), product.getProductPrice(),
                product.getProductImage(), product.getDetail(), product.getTrademark(), categories);
        this.productRepository.save(product1);
    }

    @Override
    public void delete(String id) {
        this.productRepository.deleteById(id);
    }

    @Override
    public List<Product> searchListProduct(String name) {
        return productRepository.searchListProduct(name);
    }

    @Override
    public Page<Product> searchByCategory(String name, Pageable pageable) {
        return productRepository.searchProduct(name, pageable);
    }
}
