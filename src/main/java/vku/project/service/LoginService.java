package vku.project.service;

import vku.project.dto.AccountResponse;
import vku.project.dto.ChangePasswordForm;

public interface LoginService {
    AccountResponse doLogin(String userName, String password);
    boolean doChangePassword(ChangePasswordForm form);
}
