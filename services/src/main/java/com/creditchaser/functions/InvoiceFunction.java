package com.creditchaser.functions;

import com.creditchaser.dto.InvoiceDto;
import com.creditchaser.dto.StatisticCardResponseDto;
import com.creditchaser.entities.Invoice;
import com.creditchaser.repository.InvoiceRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.Double;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service

public class InvoiceFunction {

    private final InvoiceRepository invoiceRepository;

    InvoiceFunction(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }
    private boolean isOverdue(LocalDate paymentDate) {
        return !LocalDate.now().isAfter(paymentDate);
    }
    private boolean isInCurrentMonth(LocalDate documentDate) {
        final LocalDate monthStart = LocalDate.now().withDayOfMonth(1);
        final LocalDate monthEnd = LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth());
        return !documentDate.isAfter(monthEnd) && !documentDate.isBefore(monthStart);

    }

    @Transactional(readOnly = true)
    public Page<InvoiceDto> findAllByDocumentDate(int page, int limit) {

        Pageable pageable = PageRequest.of(page, limit, Sort.by("documentDate").descending());
        return invoiceRepository.findAll(pageable).map(InvoiceDto::new);
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

    @Transactional(readOnly = true)
    public List<InvoiceDto> findLargestValueInvoices() {
        return invoiceRepository.findLargestValueInvoices()
                .stream()
                .map(InvoiceDto::new)
                .collect(Collectors.toList());
    }

    public StatisticCardResponseDto statisticCardQuery() {

        final List<Invoice> invoices = invoiceRepository.findAll()
                .stream()
                .filter(invoice -> !invoice.getDocumentDate().isAfter(LocalDate.now().plusYears(1)))
                .collect(Collectors.toList());

        BigDecimal yearlyTotalPaid = sumBy(invoices, Invoice::getPaidTotal);
        BigDecimal yearlyTotalOutstanding = sumBy(invoices, Invoice::getOutstandingTotal);
        BigDecimal yearlyTotalOverdue = sumBy(
                invoices.stream().filter(i -> isOverdue(i.getDueDate())).collect(Collectors.toList()),
                Invoice::getOutstandingTotal
        );

        List<Invoice> monthlyInvoices = invoices.stream()
                .filter(invoice -> isInCurrentMonth(invoice.getDocumentDate()))
                .collect(Collectors.toList());

        BigDecimal monthlyTotalPaid = sumBy(monthlyInvoices, Invoice::getPaidTotal);
        BigDecimal monthlyTotalOutstanding = sumBy(monthlyInvoices, Invoice::getOutstandingTotal);
        BigDecimal monthlyTotalOverdue = sumBy(
                monthlyInvoices.stream().filter(i -> isOverdue(i.getDueDate())).collect(Collectors.toList()),
                Invoice::getOutstandingTotal
        );

        return new StatisticCardResponseDto(
                yearlyTotalPaid, yearlyTotalOutstanding, yearlyTotalOverdue,
                monthlyTotalPaid, monthlyTotalOutstanding, monthlyTotalOverdue
        );
    }

    private BigDecimal sumBy(List<Invoice> invoices, Function<Invoice, BigDecimal> extractor) {
        return invoices.stream()
                .map(extractor)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }





}
