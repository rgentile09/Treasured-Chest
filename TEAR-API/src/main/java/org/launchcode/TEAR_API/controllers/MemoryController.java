package org.launchcode.TEAR_API.controllers;

import jakarta.servlet.http.HttpSession;
import org.launchcode.TEAR_API.models.Comment;
import org.launchcode.TEAR_API.models.Memory;
import org.launchcode.TEAR_API.models.User;
import org.launchcode.TEAR_API.repositories.CommentRepository;
import org.launchcode.TEAR_API.repositories.MemoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/memories")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MemoryController {


    private static final String UPLOAD_DIR ="src/main/resources/static/uploads/";

    @Autowired
    MemoryRepository memoryRepository;

    @Autowired
    private UserController userController;

    @Autowired
    private CommentRepository commentRepository;

    @GetMapping
    public ResponseEntity<List<Memory>> getAllMemories(HttpSession session) {
        User user = userController.getUserFromSession(session);

        if (user != null) {
            // Fetch memories associated with the logged-in user
            List<Memory> memories = memoryRepository.findByUser(user);
            return ResponseEntity.ok(memories);
        } else {
            // Return unauthorized status if user is not found in session
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


    @PostMapping("/new")
    public ResponseEntity<Map<String, String>> createMemory(HttpSession session,
                                                            @RequestParam String description,
                                                            @RequestParam String title,
                                                            @RequestParam("file") MultipartFile file) throws IOException {

        // Fetch the user from the session
        User user = userController.getUserFromSession(session);
        Map<String, String> responseBody = new HashMap<>();

        // Check if user is present in the session
        if (user != null) {
            // Handle file upload
            String fileName = file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());

            System.out.println("File saved at: " + filePath.toAbsolutePath());

            // Create and set up the new Memory object
            Memory newMemory = new Memory(description, title, "/uploads/" + fileName, user);

            // Save the new Memory to the repository
            memoryRepository.save(newMemory);

            // Return success response
            responseBody.put("message", "Memory successfully created");
            return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
        } else {
            // Return error response if user is not found in session
            responseBody.put("message", "User not found in session");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
        }
    }

    @GetMapping("/{memoryId}/comments")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long memoryId) {
        List<Comment> comments = commentRepository.findByMemoryId(memoryId);
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/{memoryId}/comments")
    public ResponseEntity<Map<String, String>> createComment(HttpSession session,
                                                             @RequestParam Long memoryId,
                                                             @RequestParam String text) {
        Map<String, String> responseBody = new HashMap<>();
        User user = userController.getUserFromSession(session);

        if (user != null) {
            Memory memory = memoryRepository.findById(memoryId).orElse(null);

            if (memory != null) {
                Comment comment = new Comment(text, memory, user);
                commentRepository.save(comment);
                responseBody.put("message", "Comment successfully created");
                return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
            } else {
                responseBody.put("message", "Memory not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
            }
        } else {
            responseBody.put("message", "User not found in session");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
        }
    }

    @PostMapping("/{memoryId}/comments/delete")
    public ResponseEntity<Map<String, String>> deleteComment(@PathVariable Long memoryId,
                                                             @RequestParam Long commentId) {
        Map<String, String> responseBody = new HashMap<>();

        if (commentRepository.existsById(commentId)) {
            commentRepository.deleteById(commentId);
            responseBody.put("message", "Comment successfully deleted");
            return ResponseEntity.ok(responseBody);
        } else {
            responseBody.put("message", "Comment not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
        }
    }
}

