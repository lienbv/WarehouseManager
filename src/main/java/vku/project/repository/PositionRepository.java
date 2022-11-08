package vku.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vku.project.entity.Position;

@Repository
public interface PositionRepository extends JpaRepository<Position, Integer> {
}
