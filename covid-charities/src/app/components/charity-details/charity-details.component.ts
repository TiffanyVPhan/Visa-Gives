import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

import { CharityService } from '../../services/charity.service';
import { Charity } from 'src/app/model/charity';
import { Account  } from '../../model/account';
import { AuthenticationService } from '../../services/authentication.service';

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

  pullFunds: {
    acquirerCountryCode: string,
    acquiringBin: string,
    amount: string,
    businessApplicationId: string,
    cardAcceptor: {
      address: {
        country: string,
        county: string,
        state: string,
        zipCode: string
      },
      idCode: string,
      name: string,
      terminalId: string
    },
    cavv: string,
    foreignExchangeFeeTransaction: string,
    localTransactionDateTime: string,
    retrievalReferenceNumber: string,
    senderCardExpiryDate: string,
    senderCurrencyCode: string,
    senderPrimaryAccountNumber: string,
    surcharge: string,
    systemsTraceAuditNumber: string,
    nationalReimbursementFee: string,
    cpsAuthorizationCharacteristicsIndicator: string,
    addressVerificationData: {
      street: string,
      postalCode: string
    },
    settlementServiceIndicator: string,
    colombiaNationalServiceData: {
      countryCodeNationalService: string,
      nationalReimbursementFee: string,
      nationalNetMiscAmountType: string,
      nationalNetReimbursementFeeBaseAmount: string,
      nationalNetMiscAmount: string,
      addValueTaxReturn: string,
      taxAmountConsumption: string,
      addValueTaxAmount: string,
      costTransactionIndicator: string,
      emvTransactionIndicator: string,
      nationalChargebackReason: string
    },
    riskAssessmentData: {
      delegatedAuthenticationIndicator: boolean,
      lowValueExemptionIndicator: boolean,
      traExemptionIndicator: boolean,
      trustedMerchantExemptionIndicator: boolean,
      scpExemptionIndicator: boolean
    },
    visaMerchantIdentifier: string
    } =
  {
    acquirerCountryCode: "840",
    acquiringBin: "408999",
    amount: "124.02",
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

    pushFunds: {
      acquirerCountryCode: string,
      acquiringBin: string,
      amount: string,
      businessApplicationId: string,
      cardAcceptor: {
        address: {
          country: string,
          county: string,
          state: string,
          zipCode: string
        },
        idCode: string,
        name: string,
        terminalId: string
      },
      localTransactionDateTime: string,
      merchantCategoryCode: string,
      pointOfServiceData: {
        motoECIIndicator: string,
        panEntryMode: string,
        posConditionCode: string
      },
      recipientName: string,
      recipientPrimaryAccountNumber: string,
      retrievalReferenceNumber: string,
      senderAccountNumber: string,
      senderAddress: string,
      senderCity: string,
      senderCountryCode: string,
      senderName: string,
      senderReference: string,
      senderStateCode: string,
      sourceOfFundsCode: string,
      systemsTraceAuditNumber: string,
      transactionCurrencyCode: string,
      transactionIdentifier: string,
      settlementServiceIndicator: string,
      colombiaNationalServiceData: {
        countryCodeNationalService: string,
        nationalReimbursementFee: string,
        nationalNetMiscAmountType: string,
        nationalNetReimbursementFeeBaseAmount: string,
        nationalNetMiscAmount: string,
        addValueTaxReturn: string,
        taxAmountConsumption: string,
        addValueTaxAmount: string,
        costTransactionIndicator: string,
        emvTransactionIndicator: string,
        nationalChargebackReason: string
      }
    } =  
    {
    acquirerCountryCode: "840",
    acquiringBin: "408999",
    amount: "124.05",
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

    reverseFunds: {
      acquirerCountryCode: string,
      acquiringBin: string,
      businessApplicationId: string,
      amount: string,
      cardAcceptor: {
        address: {
          country: string,
          county: string,
          state: string
          zipCode: string
        },
        idCode: string,
        name: string,
        terminalId: string
      },
      localTransactionDateTime: string,
      originalDataElements: {
        acquiringBin: string,
        approvalCode: string,
        systemsTraceAuditNumber: string,
        transmissionDateTime: string
      },
      pointOfServiceCapability: {
        posTerminalEntryCapability: string,
        posTerminalType: string
      },
      pointOfServiceData: {
        motoECIIndicator: string,
        panEntryMode: string,
        posConditionCode: string
      },
      retrievalReferenceNumber: string,
      senderCardExpiryDate: string,
      senderCurrencyCode: string,
      senderPrimaryAccountNumber: string,
      systemsTraceAuditNumber: string,
      transactionIdentifier: string,
      settlementServiceIndicator: string,
      colombiaNationalServiceData: {
        countryCodeNationalService: string,
        nationalReimbursementFee: string,
        nationalNetMiscAmountType: string,
        nationalNetReimbursementFeeBaseAmount: string,
        nationalNetMiscAmount: string,
        addValueTaxReturn: string,
        taxAmountConsumption: string,
        addValueTaxAmount: string,
        costTransactionIndicator: string,
        emvTransactionIndicator: string,
        nationalChargebackReason: string
      }
    } =
     
{
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
      // Add new settle transaction function call here from auth service

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
