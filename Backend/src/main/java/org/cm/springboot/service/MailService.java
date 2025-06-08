//package org.cm.springboot.service;
//
//import com.sendgrid.*;
//import com.sendgrid.helpers.mail.Mail;
//import com.sendgrid.helpers.mail.objects.Content;
//import com.sendgrid.helpers.mail.objects.Email;
//import com.sendgrid.helpers.mail.objects.Personalization;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.UUID;
//
//@Service
//public class MailService {
//
//    private static final Logger logger = LoggerFactory.getLogger(MailService.class);
//
//
//
//
//    @Autowired
//    private VerificationCodeService verificationCodeService;
//
//    public void sendMail(String to, String subject, String content) {
//        try {
//            Email fromEmail = new Email(from);
//            Email toEmail = new Email(to);
//
//            Content contentObj = new Content("text/plain", content);
//            Mail mail = new Mail(fromEmail, subject, toEmail, contentObj);
//
//            Request request = new Request();
//            request.setMethod(Method.POST);
//            request.setEndpoint("mail/send");
//            request.setBody(mail.build());
//
//            Response response = sendGrid.api(request);
//            if (response.getStatusCode() == 202) {
//                logger.info("Email sent successfully");
//            } else {
//                logger.warn("Email send failed. Status: {}, Body: {}", response.getStatusCode(), response.getBody());
//            }
//        } catch (IOException e) {
//            logger.error("Exception while sending email", e);
//        }
//    }
//    public void emailVerification(int userid , String to, String name) throws IOException {
//        logger.info("Email verification");
//        Email fromEmail = new Email(from , "Trần Tiến Phúc");
//        Email toEmail = new Email(to);
//
//        String object = "Xác thực tài khoản";
//        String id = UUID.randomUUID().toString();
//        verificationCodeService.saveCode(userid , id);
//        String verify_link = "http://localhost:8082/user/confirm-email?secretcode=" + id;
//
//        Map<String , String> map = new HashMap<>();
//        map.put("name", name);
//        map.put("verify_link", verify_link);
//
//        Mail mail = new Mail();
//        mail.setFrom(fromEmail);
//        mail.setSubject(object);
//
//        Personalization personalization = new Personalization();
//        personalization.addTo(toEmail);
//        map.forEach(personalization::addDynamicTemplateData);
//        mail.addPersonalization(personalization);
//        mail.setTemplateId("d-34c421580a9a4078ae99258362d22e96");
//
//        Request request = new Request();
//        request.setMethod(Method.POST);
//        request.setEndpoint("mail/send");
//        request.setBody(mail.build());
//
//        Response response = sendGrid.api(request);
//        if (response.getStatusCode() == 202) {
//            logger.info("Verification sent successfully");
//        } else {
//            logger.warn("Verification send failed. Status: {}, Body: {}", response.getStatusCode(), response.getBody());
//        }
//    }
//}
