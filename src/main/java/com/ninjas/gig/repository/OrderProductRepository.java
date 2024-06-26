package com.ninjas.gig.repository;

import com.ninjas.gig.entity.Order;
import com.ninjas.gig.entity.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Long> {

    List<OrderProduct> findByOrderId(Long orderId);
}
