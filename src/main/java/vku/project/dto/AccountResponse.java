package vku.project.dto;

import java.util.Date;

public class AccountResponse {
    private String userName;
    private Date lastUpdate;
    private String token;
    private String role;

    public AccountResponse(String userName, Date lastUpdate, String token, String role) {
        this.userName = userName;
        this.lastUpdate = lastUpdate;
        this.token = token;
        this.role = role;
    }

    public AccountResponse(String token) {
        this.token = token;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Date getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Date lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
