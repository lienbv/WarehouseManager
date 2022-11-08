package vku.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vku.project.entity.Categories;



@Repository
public interface CategoryRepository extends JpaRepository<Categories, Integer> {
}
