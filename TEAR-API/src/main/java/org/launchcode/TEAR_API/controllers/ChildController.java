package org.launchcode.TEAR_API.controllers;
import jakarta.servlet.http.HttpSession;
import org.launchcode.TEAR_API.models.Child;
import org.launchcode.TEAR_API.models.User;
import org.launchcode.TEAR_API.repositories.ChildRepository;
import org.launchcode.TEAR_API.repositories.MemoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/children")
@CrossOrigin(origins = "https://treasured-chest.netlify.app", allowCredentials = "true")
public class ChildController {
    @Autowired
    private ChildRepository childRepository;
    @Autowired
    MemoryRepository memoryRepository;
    @Autowired
    private UserController userController;

    @GetMapping
    public ResponseEntity<List<Child>> getAllChildren(HttpSession session) {
        User user = userController.getUserFromSession(session);
        if (user != null) {
            Long userId = user.getId();
            // Fetch memories associated with the logged-in user
            List<Child> children = (List<Child>) childRepository.findByUserId(userId);
            return ResponseEntity.ok(children);
        } else {
            // Return unauthorized status if user is not found in session
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    @PostMapping("{childId}")
    public ResponseEntity<Map<String, String>> deleteChild(@RequestParam Long childId) {
        Map<String, String> responseBody = new HashMap<>();

        if (childRepository.existsById(childId)) {
            childRepository.deleteById(childId);
            responseBody.put("message", "Child successfully deleted");
            return ResponseEntity.ok(responseBody);
        } else {
            responseBody.put("message", "Child not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseBody);
        }
    }
    @PostMapping("/new")
    public ResponseEntity<Map<String, String>> createChild(HttpSession session,
                                                           @RequestBody Child newChild) {

        // Fetch the user from the session
        User user = userController.getUserFromSession(session);
        Map<String, String> responseBody = new HashMap<>();

        // Check if user is present in the session
        if (user != null) {

            // Set the user for the new child
            newChild.setUser(user);

            // Save the new Child to the repository
            childRepository.save(newChild);

            // Return success response
            responseBody.put("message", "Child successfully created");
            return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
        } else {
            // Return error response if user is not found in session
            responseBody.put("message", "User not found in session");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
        }
    }
}
