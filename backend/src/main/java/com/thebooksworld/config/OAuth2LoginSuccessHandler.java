package com.thebooksworld.config;

import com.thebooksworld.model.User;
import com.thebooksworld.repository.UserRepository;
import com.thebooksworld.service.JwtTokenProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        
        // Extract email and name
        // Google checks "email", GitHub checks "email" (might be null if private), "login" as fallback or similar.
        // For simplicity, we assume email is available or we default.
        String email = oauth2User.getAttribute("email");
        String name = oauth2User.getAttribute("name");
        
        if (email == null) {
             // Fallback for GitHub if email is not public
             // Note: In real app, might need to call GitHub API to get emails
             String login = oauth2User.getAttribute("login");
             if (login != null) {
                 email = login + "@github.example.com"; 
             } else {
                 email = "user_" + oauth2User.getAttribute("id") + "@unknown.com";
             }
        }
        
        if (name == null) {
            name = "User";
        }

        Optional<User> userOptional = userRepository.findByEmail(email);
        User user;
        
        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            // Register new user
            user = new User();
            user.setEmail(email);
            // Handling naming - split name or just set first name
            String[] names = name.split(" ");
            user.setFirstName(names[0]);
            if (names.length > 1) {
                user.setLastName(names[names.length - 1]);
            } else {
                user.setLastName("");
            }
            user.setPassword(""); // No password for OAuth users
            user = userRepository.save(user);
        }

        // Generate Token
        String token = jwtTokenProvider.generateToken(user.getId(), user.getEmail());

        // Redirect to Frontend
        // We will assume frontend is running on localhost:3000
        String targetUrl = "http://localhost:3000/oauth2/redirect?token=" + token + "&userId=" + user.getId();
        
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
