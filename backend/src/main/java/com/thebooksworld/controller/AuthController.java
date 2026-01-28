package com.thebooksworld.controller;

import com.thebooksworld.dto.SignUpRequest;
import com.thebooksworld.dto.SignUpResponse;
import com.thebooksworld.dto.UserDetailsRequest;
import com.thebooksworld.dto.LoginRequest;
import com.thebooksworld.dto.LoginResponse;
import com.thebooksworld.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponse> signUp(@Valid @RequestBody SignUpRequest request) {
        try {
            SignUpResponse response = userService.signUp(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            SignUpResponse errorResponse = new SignUpResponse();
            errorResponse.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PostMapping("/update-details/{userId}")
    public ResponseEntity<String> updateUserDetails(
            @PathVariable Long userId,
            @Valid @RequestBody UserDetailsRequest request) {
        try {
            userService.updateUserDetails(userId, request);
            return ResponseEntity.ok("Details updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            LoginResponse response = userService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            LoginResponse errorResponse = new LoginResponse();
            errorResponse.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserDetails(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(userService.getUserById(userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
