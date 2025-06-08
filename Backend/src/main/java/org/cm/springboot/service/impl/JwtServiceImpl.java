package org.cm.springboot.service.impl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.cm.springboot.common.TokenType;
import org.cm.springboot.exception.TokenExpiredException;
import org.cm.springboot.service.JwtService;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.*;
import java.util.function.Function;

@Service
public class JwtServiceImpl implements JwtService {

    private long expireMinutes = 60;
    private long expireDay = 365;

    @Override
    public String generateAccessToken(String email, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", authorities);
        return generateToken(claims , email);
    }

    @Override
    public String generateRefeshToken(String email,  List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", authorities);
        return generateRefeshToken(claims , email);
    }
    public String generateToken(Map<String, Object> claims , String email) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * expireDay))
                .signWith(getKey(TokenType.ACCESS_TOKEN) , SignatureAlgorithm.HS256)
                .compact();
    }
    public String generateRefeshToken(Map<String, Object> claims , String email) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * expireDay))
                .signWith(getKey(TokenType.REFRESH_TOKEN) , SignatureAlgorithm.HS256)
                .compact();
    }
    private Key getKey(TokenType tokenType) {
        switch (tokenType) {
            case ACCESS_TOKEN -> {
                return Keys.hmacShaKeyFor(Decoders.BASE64.decode("vMsqWGKHFgxWoImQJdWhZkcr09mOkHcOUgDa6v3Xof4="));
            }
            case REFRESH_TOKEN -> {
                return Keys.hmacShaKeyFor(Decoders.BASE64.decode("o5TtfScvDpQYDA/VK5qPCDUVvjw8JnmieCmd79i28Iw="));
            }
            default -> {
                throw new InvalidDataAccessApiUsageException("Invalid token type");
            }
        }
    }
    @Override
    public String extractEmail(TokenType tokenType, String token) {
        try {
            return extractAllClaims(tokenType, token, Claims::getSubject);  // Giả sử Claims::getSubject là cách bạn lấy email
        } catch (ExpiredJwtException e) {
            throw new TokenExpiredException("Token đã hết hạn");
        }
    }
    @Override
    public <T> T extractAllClaims(TokenType tokenType , String token , Function<Claims, T> claimsFunction){
            Claims claims = parseToken(token , tokenType);
            return claimsFunction.apply(claims);
    }

    private Claims parseToken(String token, TokenType tokenType) {
        try{
            return Jwts.parser().setSigningKey(getKey(tokenType)).build().parseClaimsJws(token).getBody();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
