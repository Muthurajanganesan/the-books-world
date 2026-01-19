package com.thebooksworld.service;

import com.thebooksworld.dto.SignUpRequest;
import com.thebooksworld.dto.SignUpResponse;
import com.thebooksworld.dto.UserDetailsRequest;
import com.thebooksworld.dto.LoginRequest;
import com.thebooksworld.dto.LoginResponse;
import com.thebooksworld.model.User;
import com.thebooksworld.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public SignUpResponse signUp(SignUpRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Create new user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setDetailsCompleted(false);

        User savedUser = userRepository.save(user);
        
        return new SignUpResponse(
            "User registered successfully. Please complete your details",
            savedUser.getId(),
            savedUser.getEmail()
        );
    }

    public void updateUserDetails(Long userId, UserDetailsRequest request) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(request.getFirstName());
        user.setSecondName(request.getSecondName());
        user.setLastName(request.getLastName());
        user.setAddress(request.getAddress());
        user.setMobileNumber(request.getMobileNumber());
        user.setAlternateMobileNumber(request.getAlternateMobileNumber());
        user.setCity(request.getCity());
        user.setState(request.getState());
        user.setZipCode(request.getZipCode());
        user.setDetailsCompleted(true);

        userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }

        User user = optionalUser.get();
        
        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Generate JWT token
        String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail());

        return new LoginResponse(
            "Login successful",
            token,
            user.getId(),
            user.getEmail()
        );
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
