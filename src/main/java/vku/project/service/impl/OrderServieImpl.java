package vku.project.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import vku.project.dto.DtoOrder;
import vku.project.dto.DtoProduct;
import vku.project.entity.*;
import vku.project.repository.*;
import vku.project.service.CodeProductService;
import vku.project.service.OrderProductService;
import vku.project.service.OrderService;

import java.util.Date;
import java.util.List;

@Service
public class OrderServieImpl implements OrderService {
    @Autowired
    CodeProductRepository codeProductRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    CodeProductService codeProductService;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    OrderProductService orderProductService;
    @Autowired
    MailSender mailSender;

    @Override
    public void order(DtoOrder dtoOrder) {
//        List<Product> productList = new ArrayList<>();
        Product product1 = null;
        Account account1 = accountRepository.findById(dtoOrder.getAccount()).orElse(null);
        StatusContract statusContract = new StatusContract(1, "Đang Chờ");
        Date date = new Date(System.currentTimeMillis());
        Orders orders = new Orders(dtoOrder.getOrdersId(), date, dtoOrder.getAddress(), dtoOrder.getUserName(), dtoOrder.getPhone(),
                dtoOrder.getTotal(), statusContract, account1);
        Orders order1 = this.orderRepository.save(orders);
        for (DtoProduct p : dtoOrder.getIdProduct()) {
            product1 = productRepository.findById(p.getProductId()).orElse(null);
//            productList.add(product1);
            if (account1 != null && product1 != null) {
                if (product1.getProductQuantity() > 0) {
                    product1.setProductQuantity(product1.getProductQuantity() - p.getProductQuantity());
                }
                OrderProductKey orderProductKey = new OrderProductKey(product1.getProductId(),order1.getOrdersId());
                OrderProduct orderProduct = new OrderProduct(orderProductKey,product1,order1,p.getProductQuantity());
                orderProductService.save(orderProduct);
                productRepository.save(product1);
            }
        }
        System.out.println();
        String htmlMsg = "Xin chào: " + dtoOrder.getAccount() + "\n" + "Cảm ơn bạn đã mua hàng ở cửa hàng chúng tôi" +
                "\n" + "Tống số tiền đơn hàng là: " + dtoOrder.getTotal() + "\n";

        String subject = "Wellcome, you have successfully payment an account ad Vibee";
        sendEmail("lienptph16568@fpt.edu.vn", account1.getCustomer().getEmail(), subject, htmlMsg);

    }

    @Override
    public List<Orders> getOrderByAccount(String account) {
        System.out.println();
        return this.orderRepository.findAllByAccount_Account(account);
    }

    @Override
    public List<Orders> getListOrder(Date startDate, Date endDate) {

        return this.orderRepository.getList(startDate,endDate);
    }

    @Override
    public Orders findById(int id) {
        return this.orderRepository.findById(id).orElse(null);
    }

    @Override
    public void save(Orders orders) {
        this.orderRepository.save(orders);
    }

    @Override
    public void delete(int id) {
        this.orderRepository.deleteById(id);
    }

    public void sendEmail(String from, String to, String subject, String content) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(from);
        mailMessage.setTo(to);
        mailMessage.setSubject(subject);
        mailMessage.setText(content);

        mailSender.send(mailMessage);
    }
}
