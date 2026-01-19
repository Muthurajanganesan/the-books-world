package com.thebooksworld.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDTO {
    private Long id;
    private Long bookId;
    private String bookTitle;
    private Integer quantity;
    private Double price;
    private Double totalPrice;
}
