

@RestController
@RequestMapping("/api/id")
public class IDController {

    @Autowired
    private IDRepository idRepository;

    @Autowired
    private UserController userController;

    @GetMapping
    public  ResponseEntity<List<Id>> getAllId(HttpSession) {
        User user = userController.getUserFromSession(session);
        if (user != null) {
            List<Id> ids = idRepository.findByUser(user);
            return ResponseEntity.ok(ids);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            
        }
       }
       @PostMapping("/delete")
         public ResponseEntity<Map<String, String>> deleteId(@RequestParam int idId) {
            Map<String, String> response = new HashMap<>();
            if (idRepository.existsById(idId)) {
                idRepository.deleteById(idId);
                response.put("message", "ID deleted successfully");
                return ResponseEntity.ok(response);
            } else {
                response.put("message", "ID not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        }

        @PostMapping
        public ResponseEntity<Id> addId(@RequestBody Id id, HttpSession session) {

              User user = userController.getUserFromSession(session);
              Map<String, String> response = new HashMap<>();
              if (user != null) {
                Id newId = new Id();
                newId.setUser(user);
                idRepository.save(newId);
                response.put("message", "ID created successfully");
                return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);
              } else {
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
              }
         }
}