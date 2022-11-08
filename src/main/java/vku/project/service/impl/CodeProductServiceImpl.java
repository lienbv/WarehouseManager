package vku.project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vku.project.entity.CodeProduct;
import vku.project.repository.CodeProductRepository;
import vku.project.service.CodeProductService;
@Service
public class CodeProductServiceImpl implements CodeProductService {
    @Autowired
    private CodeProductRepository codeProductRepository;
    @Override
    public void save(CodeProduct code) {
        this.codeProductRepository.save(code);
    }

    @Override
    public CodeProduct findByProduct(Integer id) {
        return null;
    }
}
