package vku.project.service;

import vku.project.entity.CodeProduct;

public interface CodeProductService {
    void save(CodeProduct code);
    CodeProduct findByProduct(Integer id);
}
