package com.creditchaser.repository;

import com.creditchaser.entities.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Query(nativeQuery = true,
            value = """
    SELECT i.*
    FROM invoice i
    JOIN customer c ON i.customer_id = c.id
    WHERE i.document_number::text LIKE '%' || :search || '%'
       OR lower(c.first_name) LIKE '%' || :search || '%'
       OR lower(c.last_name) LIKE '%' || :search || '%'
    """,
            countQuery = """
    SELECT count(*)
    FROM invoice i
    JOIN customer c ON i.customer_id = c.id
    WHERE i.document_number::text LIKE '%' || :search || '%'
       OR c.first_name LIKE '%' || :search || '%'
       OR c.last_name LIKE '%' || :search || '%'
    """
    )
    Page<Invoice> findAllBySearch(@Param("search") String search, Pageable pageable);
}
