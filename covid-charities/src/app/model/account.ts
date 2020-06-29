// export type donationHistoryItem = {
//     amount: number,
//     charityID: string,
//     dateDonated
// }
export class Account {
    constructor(public firstName: string,
                public lastName: string,
                public interests: string [],
                public donationHistory: string [],
                public profilePicture: string,
                public totalAmountDonated: number,
                public email: string,
                public userID: string) {}
}
