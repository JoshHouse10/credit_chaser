package com.creditchaser.dto;

import java.math.BigDecimal;

public class StatisticCardResponseDto {

    public BigDecimal yearlyTotalPaid;
    public BigDecimal yearlyTotalOutstanding;
    public BigDecimal yearlyTotalOverdue;
    public BigDecimal monthlyTotalPaid;
    public BigDecimal monthlyTotalOutstanding;
    public BigDecimal monthlyTotalOverdue;

    public StatisticCardResponseDto() {
    }

    public StatisticCardResponseDto(BigDecimal yearlyTotalPaid, BigDecimal yearlyTotalOutstanding, BigDecimal yearlyTotalOverdue, BigDecimal monthlyTotalPaid, BigDecimal monthlyTotalOutstanding, BigDecimal monthlyTotalOverdue) {
        this.yearlyTotalPaid = yearlyTotalPaid;
        this.yearlyTotalOutstanding = yearlyTotalOutstanding;
        this.yearlyTotalOverdue = yearlyTotalOverdue;
        this.monthlyTotalPaid = monthlyTotalPaid;
        this.monthlyTotalOutstanding = monthlyTotalOutstanding;
        this.monthlyTotalOverdue = monthlyTotalOverdue;
    }

    public BigDecimal getYearlyTotalPaid() {
        return yearlyTotalPaid;
    }

    public void setYearlyTotalPaid(BigDecimal yearlyTotalPaid) {
        this.yearlyTotalPaid = yearlyTotalPaid;
    }

    public BigDecimal getYearlyTotalOutstanding() {
        return yearlyTotalOutstanding;
    }

    public void setYearlyTotalOutstanding(BigDecimal yearlyTotalOutstanding) {
        this.yearlyTotalOutstanding = yearlyTotalOutstanding;
    }

    public BigDecimal getYearlyTotalOverdue() {
        return yearlyTotalOverdue;
    }

    public void setYearlyTotalOverdue(BigDecimal yearlyTotalOverdue) {
        this.yearlyTotalOverdue = yearlyTotalOverdue;
    }

    public BigDecimal getMonthlyTotalPaid() {
        return monthlyTotalPaid;
    }

    public void setMonthlyTotalPaid(BigDecimal monthlyTotalPaid) {
        this.monthlyTotalPaid = monthlyTotalPaid;
    }

    public BigDecimal getMonthlyTotalOutstanding() {
        return monthlyTotalOutstanding;
    }

    public void setMonthlyTotalOutstanding(BigDecimal monthlyTotalOutstanding) {
        this.monthlyTotalOutstanding = monthlyTotalOutstanding;
    }

    public BigDecimal getMonthlyTotalOverdue() {
        return monthlyTotalOverdue;
    }

    public void setMonthlyTotalOverdue(BigDecimal monthlyTotalOverdue) {
        this.monthlyTotalOverdue = monthlyTotalOverdue;
    }
}
