package org.cm.springboot.payload;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class ErrorReponse {
    private Date timestamp;
    private int status;
    private String path;
    private String error;
    private Object message;

}
