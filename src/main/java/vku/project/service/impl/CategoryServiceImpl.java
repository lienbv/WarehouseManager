package vku.project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vku.project.entity.Categories;
import vku.project.repository.CategoryRepository;
import vku.project.service.CategoryService;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public List<Categories> finAll() {
        return this.categoryRepository.findAll();
    }
}
