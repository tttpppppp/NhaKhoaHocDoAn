package org.cm.springboot.controller.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class TokenResponse {
    private String access_token;
    private String refresh_token;
}
