package vku.project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vku.project.entity.Position;
import vku.project.repository.PositionRepository;
import vku.project.service.PositionService;

import java.util.List;

@Service
public class PositionServiceImpl implements PositionService {
    @Autowired
    private PositionRepository positionRepository;
    @Override
    public List<Position> finAll() {
        return this.positionRepository.findAll();
    }
}
