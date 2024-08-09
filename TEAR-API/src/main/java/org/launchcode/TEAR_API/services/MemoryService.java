package org.launchcode.TEAR_API.services;

import org.launchcode.TEAR_API.models.Child;
import org.launchcode.TEAR_API.models.Memory;
import org.launchcode.TEAR_API.repositories.ChildRepository;
import org.launchcode.TEAR_API.repositories.MemoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemoryService {
    @Autowired
    private MemoryRepository memoryRepository;

    @Autowired
    private ChildRepository childRepository;

   public Memory addMemory(Long childId, Memory memory) {
       Child child = childRepository.findByUserId(childId);
       memory.setChild(child);
       return memoryRepository.save(memory);
   }

    public List<Memory> findByChildId(Long childId) {
        return memoryRepository.findByChildId(childId);
    }
}

