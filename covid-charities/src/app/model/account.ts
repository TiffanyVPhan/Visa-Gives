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
                public payment: paymentMethod) {}
}
