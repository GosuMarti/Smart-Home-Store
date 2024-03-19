package com.ninjas.gig;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductsController {

    private ProductsRepository repository;

    public ProductsController(ProductsRepository repository) {
        this.repository = repository;
    }

   public record ProductRequest(String name, long price, String brand) {}

    @PostMapping("/")
    public ResponseEntity<?> addProduct(@RequestBody ProductRequest productRequest) {
        Product newProduct = new Product(productRequest.name, productRequest.price, productRequest.brand);
        repository.save(newProduct);
        return ResponseEntity.ok(repository.findAll());
    }


    @GetMapping("/")
    public List<Product> hello() {
        return repository.findAll();
    }

    // dependency injection and dependency inversion -> what is that and what it has to do with spring beans

}