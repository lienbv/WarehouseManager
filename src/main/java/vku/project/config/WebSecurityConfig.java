package vku.project.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.InMemoryTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import vku.project.service.impl.AccountDetailsServiceImpl;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private AccountDetailsServiceImpl accountDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(accountDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.headers().frameOptions().disable().and().cors();
        http.cors().and().csrf().disable()
                .authorizeRequests().antMatchers("/product/listAllProduct", "/login", "/customer/create", "/customer/edit", "/product/listSearch"
                , "/product/getInformation/{id}", "/customer/account",
                "/customer/detailCustomerByAccount/{id}", "/product/catagory", "/order/orders", "/customer/getByAccount/{id}"
                , "/order/getOrders/{id}", "/order/getListOrderProduct/{account}",
                "/order/search","/customer/changePassWord","/change-password").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
//                .antMatchers("/api/employee/**", "/random").hasAnyRole("EMPLOYEE")
                .antMatchers("/product/list", "/product/create", "/product/edit", "/product/delete/{id}", "/product/search",
                        "/customer/list", "/product/delete/{id}",
                        "/employee/position", "/employee/list",
                        "/employee//getInformation/{id}",
                        "/employee/create", "/employee/edit",
                        "/employee/delete/{id}", "/employee/search", "/order/listOrder-Admin",
                        "/order/statisticOrder","/customer/getInforByAdmin/{id}",
                        "/order/finById/{id}","/order/delete/{id}").hasRole("ADMIN")
                .anyRequest().authenticated().and().
                exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().
                sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public PersistentTokenRepository persistentTokenRepository() {
        return new InMemoryTokenRepositoryImpl();
    }
}
