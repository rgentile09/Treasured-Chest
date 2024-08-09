package org.launchcode.TEAR_API.controllers;

import org.launchcode.TEAR_API.models.Child;
import org.launchcode.TEAR_API.models.Memory;
import org.launchcode.TEAR_API.services.MemoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/memories")
public class MemoryController {
    @Autowired
    private MemoryService memoryService;

    @PostMapping("/child/{childId}")
    public Memory addMemory(@PathVariable Long childId, @RequestBody Memory memory) {
        return memoryService.addMemory(childId, memory);
    }

    @GetMapping("/child/{childId}")
    public List<Memory> getMemoriesByChildId(@PathVariable Long childId) {
        return memoryService.findByChildId(childId);
    }
}

