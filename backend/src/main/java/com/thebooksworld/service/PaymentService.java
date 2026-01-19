package com.thebooksworld.service;

import com.thebooksworld.model.Order;
import com.thebooksworld.model.Payment;
import com.thebooksworld.model.User;
import com.thebooksworld.repository.OrderRepository;
import com.thebooksworld.repository.PaymentRepository;
import com.thebooksworld.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    public Payment savePayment(Long userId, Long orderId, String stripePaymentId, Double amount) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Payment payment = new Payment();
        payment.setUser(user);
        payment.setOrder(order);
        payment.setStripePaymentId(stripePaymentId);
        payment.setAmount(amount);
        payment.setCurrency("INR");
        payment.setPaymentStatus("SUCCESS");

        return paymentRepository.save(payment);
    }

    public Payment getPaymentByStripeId(String stripePaymentId) {
        return paymentRepository.findByStripePaymentId(stripePaymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }
}
