package com.creditchaser.functions;

import com.creditchaser.dto.InvoiceDto;
import com.creditchaser.entities.Invoice;
import com.creditchaser.repository.InvoiceRepository;
import org.springframework.cglib.core.Local;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class InvoiceFunction {

    private final InvoiceRepository invoiceRepository;

    InvoiceFunction(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    public List<InvoiceDto> findAllDueNext7Days() {

        LocalDate from = LocalDate.now();
        LocalDate to = LocalDate.now().plusWeeks(1);

        List<Invoice> invoicesOutstanding = invoiceRepository.findAll().stream().filter(i -> i.getDueDate().isAfter(from) && i.getDueDate().isBefore(to) && i.getOutstandingTotal().compareTo(BigDecimal.ZERO) > 0).collect(Collectors.toList());

        List<InvoiceDto> dtoList = new ArrayList<>();

        invoicesOutstanding.forEach(invoice -> {
            dtoList.add(new InvoiceDto(invoice));
        });
        return dtoList;
    }
}
