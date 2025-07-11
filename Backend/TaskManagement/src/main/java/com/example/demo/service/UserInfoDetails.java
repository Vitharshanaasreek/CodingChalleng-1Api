package com.example.demo.service;

import com.example.demo.model.User;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;

import java.util.*;

@AllArgsConstructor
public class UserInfoDetails implements UserDetails {

    private final User user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList(); // no roles yet
    }

    @Override
    public String getPassword() {
        return user.getPassword(); // from your entity
    }

    @Override
    public String getUsername() {
        return user.getUsername(); // from your entity
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }
}

