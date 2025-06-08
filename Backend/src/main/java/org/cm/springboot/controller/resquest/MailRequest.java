package org.cm.springboot.controller.resquest;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MailRequest {
    private String to;
    private String subject;
    private String content;


}
