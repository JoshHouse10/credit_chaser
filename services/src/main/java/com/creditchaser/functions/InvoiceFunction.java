package com.creditchaser.functions;

import com.creditchaser.dto.InvoiceDto;
import com.creditchaser.entities.Invoice;
import com.creditchaser.repository.InvoiceRepository;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service

public class InvoiceFunction {

    private final InvoiceRepository invoiceRepository;

    InvoiceFunction(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }
    @Transactional(readOnly = true)
    public List<InvoiceDto> findAllDueNext7Days() {

        LocalDate from = LocalDate.now();
        LocalDate to = LocalDate.now().plusWeeks(1);
        System.out.println(String.format("searching for invoices between %s & %s", from, to));

        List<Invoice> invoicesOutstanding = invoiceRepository.findAll()
                .stream()
                .filter
                        (i -> !i.getDueDate().isBefore(from) &&
                                !i.getDueDate().isAfter(to) &&
                                i.getOutstandingTotal().compareTo(BigDecimal.ZERO) > 0)
                .collect(Collectors.toList());

        List<InvoiceDto> dtoList = new ArrayList<>();

        invoicesOutstanding.forEach(invoice -> {
            dtoList.add(new InvoiceDto(invoice));
        });
        return dtoList;
    }
}
