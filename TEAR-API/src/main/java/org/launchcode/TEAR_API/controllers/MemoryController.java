package org.launchcode.TEAR_API.controllers;

import jakarta.servlet.http.HttpSession;
import org.launchcode.TEAR_API.models.Memory;
import org.launchcode.TEAR_API.models.User;
import org.launchcode.TEAR_API.repositories.MemoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/memories")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MemoryController {
    @Autowired
    private MemoryRepository memoryRepository;

    @Autowired
    private UserController userController;

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> addMemory(HttpSession session, @RequestParam String title, @RequestParam String date, @RequestParam String description, @RequestParam String memoryPhoto) {
        User user = userController.getUserFromSession(session);
        Map<String, String> responseBody = new HashMap<>();

        if (user != null) {
            Memory newMemory = new Memory(title, date, description, memoryPhoto);
            memoryRepository.save(newMemory);
            responseBody.put("message", "Memory successfully created");
            return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
        }
    }

    @GetMapping
    public ResponseEntity<List<Memory>> getAllMemories(HttpSession session) {
        User user = userController.getUserFromSession(session);

        if (user != null) {
            List<Memory> memories = memoryRepository.findByUser(user);
            return ResponseEntity.ok(memories);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<Map<String, String>> deleteMemory(@RequestParam Long memoryId) {
        Map<String, String> responseBody = new HashMap<>();
        if (memoryRepository.existsById(memoryId)) {
            memoryRepository.deleteById(memoryId);
            responseBody.put("message", "Memory successfully deleted");
            return ResponseEntity.ok(responseBody);
        } else {
            responseBody.put("message", "Memory not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
        }
    }
}

