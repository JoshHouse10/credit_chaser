package com.creditchaser.repository;

import com.creditchaser.entities.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    @Query(nativeQuery = true, value =
            """
                SELECT * FROM invoice
                WHERE outstanding_total > 0
                ORDER BY invoice_total DESC LIMIT 10
                """)
    List<Invoice> findLargestValueInvoices();

    Page<Invoice> findAll(Pageable pageable);
}
