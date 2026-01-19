package com.thebooksworld.service;

import com.thebooksworld.dto.CartDTO;
import com.thebooksworld.dto.CartRequest;
import com.thebooksworld.model.Book;
import com.thebooksworld.model.Cart;
import com.thebooksworld.model.User;
import com.thebooksworld.repository.BookRepository;
import com.thebooksworld.repository.CartRepository;
import com.thebooksworld.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    public CartDTO addToCart(Long userId, CartRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));

        Optional<Cart> existingCart = cartRepository.findByUserIdAndBookId(userId, request.getBookId());

        Cart cart;
        if (existingCart.isPresent()) {
            cart = existingCart.get();
            cart.setQuantity(cart.getQuantity() + request.getQuantity());
        } else {
            cart = new Cart();
            cart.setUser(user);
            cart.setBook(book);
            cart.setQuantity(request.getQuantity());
        }

        Double price = book.isOnSale() ? book.getSalePrice() : book.getPrice();
        cart.setTotalPrice(price * request.getQuantity());

        Cart savedCart = cartRepository.save(cart);
        return convertToDTO(savedCart);
    }

    public List<CartDTO> getCartItems(Long userId) {
        return cartRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void removeFromCart(Long cartId) {
        cartRepository.deleteById(cartId);
    }

    public void clearCart(Long userId) {
        cartRepository.deleteByUserId(userId);
    }

    public CartDTO convertToDTO(Cart cart) {
        return new CartDTO(
            cart.getId(),
            cart.getBook().getId(),
            cart.getBook().getTitle(),
            cart.getQuantity(),
            cart.getBook().isOnSale() ? cart.getBook().getSalePrice() : cart.getBook().getPrice(),
            cart.getTotalPrice()
        );
    }
}
