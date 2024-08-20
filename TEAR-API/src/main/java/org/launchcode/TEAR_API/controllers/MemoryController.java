package org.launchcode.TEAR_API.controllers;
import jakarta.servlet.http.HttpSession;
import org.launchcode.TEAR_API.models.Child;
import org.launchcode.TEAR_API.models.Comment;
import org.launchcode.TEAR_API.models.Memory;
import org.launchcode.TEAR_API.models.User;
import org.launchcode.TEAR_API.repositories.ChildRepository;
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
import java.util.*;


@RestController
@RequestMapping("/api/memories")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class MemoryController {


    private static final String UPLOAD_DIR ="src/main/resources/static/uploads/";

    @Autowired
    ChildController childController;

    @Autowired
    MemoryRepository memoryRepository;
    @Autowired
    ChildRepository childRepository;

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

    @PostMapping("/child/{childId}/new")
    public ResponseEntity<Map<String, String>> createMemory(@PathVariable Long childId,
                                                            HttpSession session,
                                                            @RequestParam String description,
                                                            @RequestParam String title,
                                                            @RequestParam("file") MultipartFile file,
                                                            @RequestParam(defaultValue = "false") boolean isFirst) throws IOException {
        // Fetch the user from the session
        User user = userController.getUserFromSession(session);
        Map<String, String> responseBody = new HashMap<>();
        // Check if user is present in the session
        if (user != null) {
             Optional<Child> optionalChild = childRepository.findById(childId);
            if (optionalChild.isPresent()) {
                Child child = optionalChild.get();
                // check if userId equals the child's userID
                if (!child.getUser().getId().equals(user.getId())) {
                    responseBody.put("message", "Cannot add memory. This is not your Child!");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
                }

                // Handle file upload
                String fileName = file.getOriginalFilename();
                Path filePath = Paths.get(UPLOAD_DIR, fileName);
                Files.createDirectories(filePath.getParent());
                Files.write(filePath, file.getBytes());

                System.out.println("File saved at: " + filePath.toAbsolutePath());

                // Create and set up the new Memory object
                Memory newMemory = new Memory(child, description, title, "/uploads/" + fileName, isFirst, user);
                newMemory.setFirst(isFirst);
                memoryRepository.save(newMemory);
                responseBody.put("message", "Memory successfully created");
                return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
            } else {
                responseBody.put("message", "Child not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
            }

        } else {
            // Return error response if user is not found in session
            responseBody.put("message", "User not found in session");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
        }
    }

    @GetMapping("/firsts")
    public ResponseEntity<List<Memory>> getFirsts(HttpSession session) {
        User user = userController.getUserFromSession(session);
        if (user != null) {
            List<Memory> firstMemories = memoryRepository.findByUserAndIsFirstTrue(user);
            return ResponseEntity.ok(firstMemories);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/{memoryId}/comments")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long memoryId) {
        List<Comment> comments = commentRepository.findByMemoryId(memoryId);
        return ResponseEntity.ok(comments);
    }


    @GetMapping("/child/{childId}")
    public ResponseEntity<List<Memory>> getMemoriesByChildId(@PathVariable Long childId, HttpSession session) {
        User user = userController.getUserFromSession(session);

        if (user != null) {
            // get child by id and make sure it belongs to the user
            Optional<Child> childOptional = childRepository.findById(childId);

            if (childOptional.isPresent() && childOptional.get().getUser().getId().equals(user.getId())) {
                List<Memory> memories = memoryRepository.findByChildId(childId);
                return ResponseEntity.ok(memories);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Child not found or doesn't belong to the user
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // User not found in session
        }
    }

    @GetMapping("/random")
    public ResponseEntity<Memory> getRandomMemory(HttpSession session) {
        User user = userController.getUserFromSession(session);
        if (user != null) {
            List<Memory> memories = memoryRepository.findByUser(user);
            if (!memories.isEmpty()) {
                Random random = new Random();
                Memory randomMemory = memories.get(random.nextInt(memories.size()));
                return ResponseEntity.ok(randomMemory);
            } else {
                return ResponseEntity.noContent().build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}


