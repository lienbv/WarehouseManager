package vku.project.service;

import org.springframework.stereotype.Service;
import vku.project.entity.Position;

import java.util.List;


public interface PositionService {
    List<Position> finAll();
}
