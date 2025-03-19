// src/data-processing/data-processing.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { AdvisorDto } from '../advisors/dto/advisor.dto';
import { AccountDto } from '../accounts/dto/account.dto';
import { SecurityDto } from '../securities/dto/security.dto';

@Injectable()
export class DataProcessingService {
  private advisors: AdvisorDto[] = [];
  private accounts: AccountDto[] = [];
  private securities: SecurityDto[] = [];

  constructor() {
    this.loadData();
    this.processData();
  }

  private loadData(): void {
    this.advisors = JSON.parse(fs.readFileSync('data/advisors.json', 'utf8')) as AdvisorDto[];
    this.accounts = JSON.parse(fs.readFileSync('data/accounts.json', 'utf8')) as AccountDto[];
    this.securities = JSON.parse(fs.readFileSync('data/securities.json', 'utf8')) as SecurityDto[];
  }

  private processData(): void {
    // Implement your data processing logic here in future to so calculations already preped
    // Calculate total value, top securities, custodian asset distribution
  }

  getTotalAccountValue(): number {
    return this.accounts.reduce((total, account) => {
      const accountValue = account.holdings.reduce(
        (acc, holding) => acc + holding.units * holding.unitPrice,
        0,
      );
      return total + accountValue;
    }, 0);
  }

  getTopSecurities(): { ticker: string; totalValue: number }[] {
    const securityValueMap = new Map<string, number>();
    this.accounts.forEach((account) => {
      account.holdings.forEach((holding) => {
        const totalValue = holding.units * holding.unitPrice;
        securityValueMap.set(holding.ticker, (securityValueMap.get(holding.ticker) || 0) + totalValue);
      });
    });

    const securityValues = Array.from(securityValueMap, ([ticker, totalValue]) => ({ ticker, totalValue }));

    return securityValues.sort((a, b) => b.totalValue - a.totalValue);
  }

  getCustodianAssetDistribution(): { custodian: string; advisors: { advisorName: string; totalAssets: number }[] }[] {
    const custodianMap = new Map<string, Map<string, number>>();

    this.accounts.forEach((account) => {
      const advisor = this.advisors.find((a) => a.custodians.some((c) => c.repId === account.repId));
      if (advisor) {
        const custodianAssets = custodianMap.get(account.custodian) || new Map<string, number>();
        const accountValue = account.holdings.reduce((acc, holding) => acc + holding.units * holding.unitPrice, 0);
        custodianAssets.set(advisor.name, (custodianAssets.get(advisor.name) || 0) + accountValue);
        custodianMap.set(account.custodian, custodianAssets);
      }
    });

    return Array.from(custodianMap, ([custodian, advisorAssets]) => ({
      custodian,
      advisors: Array.from(advisorAssets, ([advisorName, totalAssets]) => ({ advisorName, totalAssets })).sort((a, b) => b.totalAssets - a.totalAssets),
    }));
  }

  getAdvisors(): AdvisorDto[] {
    return this.advisors;
  }

  getAccounts(): AccountDto[] {
    return this.accounts;
  }

  getSecurities(): SecurityDto[] {
    return this.securities;
  }
}