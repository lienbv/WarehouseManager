package vku.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import vku.project.dto.AccountResponse;
import vku.project.dto.ChangePasswordForm;
import vku.project.dto.LoginForm;
import vku.project.service.LoginService;

@CrossOrigin("http://localhost:4200")
@RestController
public class LoginController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private LoginService loginService;

    @PostMapping(value = "/login")
    public ResponseEntity<AccountResponse> doLogin(@RequestBody LoginForm form){
        System.out.println();
        AccountResponse account = this.loginService.doLogin(form.getUserName(),form.getPassword());
        if (account == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(account, HttpStatus.OK);
    }
    @PostMapping(value = "/change-password")
    public ResponseEntity<String> doChangePassword(@RequestBody ChangePasswordForm form){
        if(this.loginService.doChangePassword(form)){
            return new ResponseEntity<>("{\"message\": \"success\"}", HttpStatus.OK);
        }
        return new ResponseEntity<>("{\"message\": \"fail\"}", HttpStatus.OK);
    }
    @GetMapping("/random")
    public ResponseEntity<AccountResponse> randomStuff(){
        return new ResponseEntity<>(new AccountResponse("Kiểm tra jwt thành công"),
                HttpStatus.OK);
    }

}
