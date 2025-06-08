package org.cm.springboot;

import org.assertj.core.api.Assertions;
import org.cm.springboot.controller.AuthenticationController;
import org.cm.springboot.controller.MailController;
import org.cm.springboot.controller.UserController;
import org.cm.springboot.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ApplicationTests {

    @InjectMocks
    UserController userController;

    @InjectMocks
    AuthenticationController authenticationController;

    @InjectMocks
    MailController mailController;


    @Test
    void contextLoads() {
        Assertions.assertThat(userController).isNotNull();
        Assertions.assertThat(authenticationController).isNotNull();
        Assertions.assertThat(mailController).isNotNull();
    }

}
