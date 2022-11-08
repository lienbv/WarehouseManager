package vku.project.service;

import org.springframework.stereotype.Service;
import vku.project.entity.Categories;
import vku.project.entity.Position;

import java.util.List;


public interface CategoryService {
    List<Categories> finAll();
}
