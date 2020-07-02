export type donationHistoryItem = {
    amount: number,
    charity_name: string,
    date_donated: string;
}

export type paymentMethod = {
    cardHolder: string,
    cardNumber: number,
    expDate: string,
    cvv: number
}

export class Account {
    constructor(public firstName: string,
                public lastName: string,
                public interests: string [],
                public donationHistory: donationHistoryItem [],
                public profilePicture: string,
                public totalAmountDonated: number,
                public email: string,
                public userID: string,
                public payment: paymentMethod) { }
}

// export const pullFunds = 
// pullFunds: {
//     acquirerCountryCode: string,
//     acquiringBin: string,
//     amount: string,
//     businessApplicationId: string,
//     cardAcceptor: {
//       address: {
//         country: string,
//         county: string,
//         state: string,
//         zipCode: string
//       },
//       idCode: string,
//       name: string,
//       terminalId: string
//     },
//     cavv: string,
//     foreignExchangeFeeTransaction: string,
//     localTransactionDateTime: string,
//     retrievalReferenceNumber: string,
//     senderCardExpiryDate: string,
//     senderCurrencyCode: string,
//     senderPrimaryAccountNumber: string,
//     surcharge: string,
//     systemsTraceAuditNumber: string,
//     nationalReimbursementFee: string,
//     cpsAuthorizationCharacteristicsIndicator: string,
//     addressVerificationData: {
//       street: string,
//       postalCode: string
//     },
//     settlementServiceIndicator: string,
//     colombiaNationalServiceData: {
//       countryCodeNationalService: string,
//       nationalReimbursementFee: string,
//       nationalNetMiscAmountType: string,
//       nationalNetReimbursementFeeBaseAmount: string,
//       nationalNetMiscAmount: string,
//       addValueTaxReturn: string,
//       taxAmountConsumption: string,
//       addValueTaxAmount: string,
//       costTransactionIndicator: string,
//       emvTransactionIndicator: string,
//       nationalChargebackReason: string
//     },
//     riskAssessmentData: {
//       delegatedAuthenticationIndicator: boolean,
//       lowValueExemptionIndicator: boolean,
//       traExemptionIndicator: boolean,
//       trustedMerchantExemptionIndicator: boolean,
//       scpExemptionIndicator: boolean
//     },
//     visaMerchantIdentifier: string
//     };

//   pushFunds: {
//     acquirerCountryCode: string,
//     acquiringBin: string,
//     amount: string,
//     businessApplicationId: string,
//     cardAcceptor: {
//       address: {
//         country: string,
//         county: string,
//         state: string,
//         zipCode: string
//       },
//       idCode: string,
//       name: string,
//       terminalId: string
//     },
//     localTransactionDateTime: string,
//     merchantCategoryCode: string,
//     pointOfServiceData: {
//       motoECIIndicator: string,
//       panEntryMode: string,
//       posConditionCode: string
//     },
//     recipientName: string,
//     recipientPrimaryAccountNumber: string,
//     retrievalReferenceNumber: string,
//     senderAccountNumber: string,
//     senderAddress: string,
//     senderCity: string,
//     senderCountryCode: string,
//     senderName: string,
//     senderReference: string,
//     senderStateCode: string,
//     sourceOfFundsCode: string,
//     systemsTraceAuditNumber: string,
//     transactionCurrencyCode: string,
//     transactionIdentifier: string,
//     settlementServiceIndicator: string,
//     colombiaNationalServiceData: {
//       countryCodeNationalService: string,
//       nationalReimbursementFee: string,
//       nationalNetMiscAmountType: string,
//       nationalNetReimbursementFeeBaseAmount: string,
//       nationalNetMiscAmount: string,
//       addValueTaxReturn: string,
//       taxAmountConsumption: string,
//       addValueTaxAmount: string,
//       costTransactionIndicator: string,
//       emvTransactionIndicator: string,
//       nationalChargebackReason: string
//     }
//   };
