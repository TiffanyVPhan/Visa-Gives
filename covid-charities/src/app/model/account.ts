export class Account {
    constructor(public name: string,
                public donatedCharities: string [],
                public donationAmount: number [],
                public datesDonated: string [],
                public paymentMethod: string []) {
    }
}