package com.thebooksworld.controller;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.thebooksworld.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Value("${stripe.key.secret}")
    private String stripeSecretKey;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, Object>> createCheckoutSession(@RequestBody Map<String, Object> data) {
        try {
            if (stripeSecretKey == null || stripeSecretKey.isEmpty()) {
                 throw new RuntimeException("Stripe API Key is missing");
            }
            Stripe.apiKey = stripeSecretKey.trim();
            
            Double amountObj = Double.valueOf(data.get("amount").toString());
            long amountInPaise = (long) (amountObj * 100);
            Long orderId = Long.valueOf(data.get("orderId").toString());
            // userId unused in session creation payload but might be useful for metadata
            // Long userId = Long.valueOf(data.get("userId").toString());

            String callbackUrl = "http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}&order_id=" + orderId + "&amount=" + amountObj;

            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(callbackUrl)
                    .setCancelUrl("http://localhost:3000/cart")
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("inr")
                                                    .setUnitAmount(amountInPaise)
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName("Order #" + orderId)
                                                                    .build())
                                                    .build())
                                    .build())
                    .build();

            Session session = Session.create(params);

            Map<String, Object> response = new HashMap<>();
            response.put("url", session.getUrl());
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/confirm")
    public ResponseEntity<Map<String, Object>> confirmPayment(
            @RequestParam Long userId,
            @RequestParam Long orderId,
            @RequestParam String stripePaymentId,
            @RequestParam Double amount) {
        try {
            paymentService.savePayment(userId, orderId, stripePaymentId, amount);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Payment confirmed successfully");
            response.put("status", "SUCCESS");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", e.getMessage());
            response.put("status", "FAILED");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}
