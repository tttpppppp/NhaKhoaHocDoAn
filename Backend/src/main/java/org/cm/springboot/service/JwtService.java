package org.cm.springboot.service;

import io.jsonwebtoken.Claims;
import org.cm.springboot.common.TokenType;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.function.Function;

public interface JwtService {
    String generateAccessToken(String email ,  List<String> authorities);
    String generateRefeshToken(String email ,  List<String> authorities);
    <T> T extractAllClaims(TokenType tokenType , String token , Function<Claims, T> claimsFunction);
    String extractEmail(TokenType tokenType , String token);
}
