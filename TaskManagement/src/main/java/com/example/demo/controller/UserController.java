package com.example.demo.controller;


import com.example.demo.model.AuthRequest;
import com.example.demo.model.User;
import com.example.demo.repo.UserRepository;
import com.example.demo.config.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") 
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtService jwtService;

    // ✅ Register user
    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return "User registered successfully!";
    }

    // ✅ Login and generate token
    @PostMapping("/login")
    public String login(@RequestBody AuthRequest authRequest) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );

        return jwtService.generateToken(authRequest.getUsername());
    }
}

