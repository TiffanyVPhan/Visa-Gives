import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

import { CharityService } from '../../services/charity.service';
import { Charity } from 'src/app/model/charity';
import { Account  } from '../../model/account';
import { AuthenticationService } from '../../services/authentication.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-charity-details',
  templateUrl: './charity-details.component.html',
  styleUrls: ['./charity-details.component.css']
})
export class CharityDetailsComponent implements OnInit {

  account: Account;
  charity: Charity;
  selectedAmount: number = null;
  charityName: string;
  donationTiers: number[] = [5, 10, 25, 50, 100, 250, 500, 1000];
  cardNumber: number;
  donated = false;

  // payment = {
  //   amount: "",
  //   senderExpDate: "",
  //   senderCardNumber: "",
  //   recipientCardNumber: "",
  //   recipientExpDate: ""
  // }
  pullFunds = {
    acquirerCountryCode: "840",
    acquiringBin: "408999",
    amount: "",
    businessApplicationId: "AA",
    cardAcceptor: {
    address: {
      country: "USA",
      county: "081",
      state: "CA",
      zipCode: "94404"
    },
    idCode: "ABCD1234ABCD123",
    name: "Visa Inc. USA-Foster City",
    terminalId: "ABCD1234"
    },
    cavv: "0700100038238906000013405823891061668252",
    foreignExchangeFeeTransaction: "11.99",
    localTransactionDateTime: "2020-07-01T19:24:58",
    retrievalReferenceNumber: "330000550000",
    senderCardExpiryDate: "2015-10",
    senderCurrencyCode: "USD",
    senderPrimaryAccountNumber: "4895142232120006",
    surcharge: "11.99",
    systemsTraceAuditNumber: "451001",
    nationalReimbursementFee: "11.22",
    cpsAuthorizationCharacteristicsIndicator: "Y",
      addressVerificationData: {
      street: "XYZ St",
      postalCode: "12345"
    },
    settlementServiceIndicator: "9",
    colombiaNationalServiceData: {
      countryCodeNationalService: "170",
      nationalReimbursementFee: "20.00",
      nationalNetMiscAmountType: "A",
      nationalNetReimbursementFeeBaseAmount: "20.00",
      nationalNetMiscAmount: "10.00",
      addValueTaxReturn: "10.00",
      taxAmountConsumption: "10.00",
      addValueTaxAmount: "10.00",
      costTransactionIndicator: "0",
      emvTransactionIndicator: "1",
      nationalChargebackReason: "11"
    },
      riskAssessmentData: {
      delegatedAuthenticationIndicator: true,
      lowValueExemptionIndicator: true,
      traExemptionIndicator: true,
      trustedMerchantExemptionIndicator: true,
      scpExemptionIndicator: true
    },
    visaMerchantIdentifier: "73625198"
    };

    pushFunds = {
      acquirerCountryCode: "840",
      acquiringBin: "408999",
      amount: "",
      businessApplicationId: "AA",
      cardAcceptor: {
      address: {
        country: "USA",
        county: "San Mateo",
        state: "CA",
        zipCode: "94404"
      },
      idCode: "CA-IDCode-77765",
      name: "Visa Inc. USA-Foster City",
      terminalId: "TID-9999"
      },
      localTransactionDateTime: "2020-07-01T19:32:24",
      merchantCategoryCode: "6012",
      pointOfServiceData: {
        motoECIIndicator: "0",
        panEntryMode: "90",
        posConditionCode: "00"
      },
      recipientName: "rohan",
      recipientPrimaryAccountNumber: "4957030420210496",
      retrievalReferenceNumber: "412770451018",
      senderAccountNumber: "4653459515756154",
      senderAddress: "901 Metro Center Blvd",
      senderCity: "Foster City",
      senderCountryCode: "124",
      senderName: "Mohammed Qasim",
      senderReference: "",
      senderStateCode: "CA",
      sourceOfFundsCode: "05",
      systemsTraceAuditNumber: "451018",
      transactionCurrencyCode: "USD",
      transactionIdentifier: "381228649430015",
      settlementServiceIndicator: "9",
      colombiaNationalServiceData: {
        countryCodeNationalService: "170",
        nationalReimbursementFee: "20.00",
        nationalNetMiscAmountType: "A",
        nationalNetReimbursementFeeBaseAmount: "20.00",
        nationalNetMiscAmount: "10.00",
        addValueTaxReturn: "10.00",
        taxAmountConsumption: "10.00",
        addValueTaxAmount: "10.00",
        costTransactionIndicator: "0",
        emvTransactionIndicator: "1",
        nationalChargebackReason: "11"
      }
    };

  reverseFunds = {
    acquirerCountryCode: "608",
    acquiringBin: "408999",
    businessApplicationId: "AA",
    amount: "24.01",
    cardAcceptor: {
      address: {
        country: "USA",
        county: "San Mateo",
        state: "CA",
        zipCode: "94404"
      },
      idCode: "VMT200911026070",
      name: "Visa Inc. USA-Foster City",
      terminalId: "365539"
    },
    localTransactionDateTime: "2020-07-01T19:38:22",
    originalDataElements: {
        acquiringBin: "408999",
        approvalCode: "20304B",
        systemsTraceAuditNumber: "897825",
        transmissionDateTime: "2020-07-01T19:38:22"
      },
      pointOfServiceCapability: {
      posTerminalEntryCapability: "2",
      posTerminalType: "4"
    },
    pointOfServiceData: {
    motoECIIndicator: "0",
    panEntryMode: "90",
    posConditionCode: "00"
    },
    retrievalReferenceNumber: "330000550000",
    senderCardExpiryDate: "2015-10",
    senderCurrencyCode: "USD",
    senderPrimaryAccountNumber: "4895100000055127",
    systemsTraceAuditNumber: "451050",
    transactionIdentifier: "381228649430011",
    settlementServiceIndicator: "9",
    colombiaNationalServiceData: {
      countryCodeNationalService: "170",
      nationalReimbursementFee: "20.00",
      nationalNetMiscAmountType: "A",
      nationalNetReimbursementFeeBaseAmount: "20.00",
      nationalNetMiscAmount: "10.00",
      addValueTaxReturn: "10.00",
      taxAmountConsumption: "10.00",
      addValueTaxAmount: "10.00",
      costTransactionIndicator: "0",
      emvTransactionIndicator: "1",
      nationalChargebackReason: "11"
    }
  };

  constructor(public authenticationService: AuthenticationService,
              private charityService: CharityService,
              private route: ActivatedRoute) {
    this.charityService.ready.subscribe(() => {
      this.charity = this.charityService.getCharity(this.charityName);
      console.log(this.charity);
    });

    this.authenticationService.ready.subscribe(() => {
      if (this.authenticationService.currentUser != null) {
        this.authenticationService.getUser().subscribe((val: any) => {
          this.account = new Account(val.first_name,
                                    val.last_name,
                                    val.interests,
                                    val.donation_history,
                                    val.profile_image,
                                    val.total_amount_donated,
                                    val.email_address,
                                    val.user_ID,
                                    val.payment_methods);
          if (this.account.payment != undefined) {
            this.cardNumber = parseInt(this.account.payment[0].card_number.replace(/ /g,''));
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.charityName = params.get('charity_name');
      this.charity = this.charityService.getCharity(this.charityName);
      console.log(this.charity);
    });
    this.authenticationService.getUser().subscribe((val: any) => {
      this.account = new Account(val.first_name,
                                val.last_name,
                                val.interests,
                                val.donation_history,
                                val.profile_image,
                                val.total_amount_donated,
                                val.email_address,
                                val.user_ID,
                                val.payment_methods);
      if (this.account.payment != undefined) {
        this.cardNumber = parseInt(this.account.payment[0].card_number.replace(/ /g,''));
      }
    });
    console.log(JSON.stringify(this.reverseFunds));
  }

  onClick(amount) {
    if (amount === this.selectedAmount) {
      this.addDonation();
      console.log(this.charity);
      console.log(this.account.payment[0]);
      const payment = {
        amount: amount.toString(),
        senderExpDate: this.account.payment[0].exp_,
        senderCardNumber: this.account.payment[0].card_number,
        recipientCardNumber: this.charity.cardNumber.toString(),
        recipientExpDate: this.charity.exp
      };
      console.log(JSON.stringify(payment));

      // Add new settle transaction function call here from auth service
      this.pullFunds.senderPrimaryAccountNumber = this.cardNumber.toString();
      this.pullFunds.amount = amount.toString();
      this.pushFunds.amount = amount.toString();

      const pullFondsJSON = JSON.stringify(this.pullFunds);
      const pushFundsJSON = JSON.stringify(this.pushFunds);

      this.authenticationService.onCreateTransaction(pullFondsJSON);
      this.authenticationService.onCreateTransaction(pushFundsJSON);
    } else {
      this.selectedAmount = amount;
    }
    console.log(amount);
  }

  addDonation() {
    const numDonations =
    ((this.account.donationHistory === undefined) ? 0 :
    this.account.donationHistory.length);
    console.log(numDonations);

    this.authenticationService.addDonation(
      this.charityName,
      this.selectedAmount,
      formatDate(new Date(), 'MM/dd/yyyy', 'en'),
      numDonations);

    this.donated = !this.donated;
  }

  cancelDonation() {
    this.selectedAmount = null;
  }
}
