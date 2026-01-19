package com.thebooksworld.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {
    private Long id;
    private String title;
    private String author;
    private String category;
    private Double price;
    private String description;
    private String imageUrl;
    private Integer quantity;
    private boolean onSale;
    private Double salePrice;
}
