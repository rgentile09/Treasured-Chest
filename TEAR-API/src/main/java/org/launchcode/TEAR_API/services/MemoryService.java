package org.launchcode.TEAR_API.services;

import org.launchcode.TEAR_API.models.Memory;
import org.launchcode.TEAR_API.repositories.MemoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemoryService {
    @Autowired
    private MemoryRepository memoryRepository;

    public Memory save(Memory memory) {
        return memoryRepository.save(memory);
    }

    public List<Memory> findByChildId(Long childId) {
        return memoryRepository.findByChildId(childId);
    }
}

