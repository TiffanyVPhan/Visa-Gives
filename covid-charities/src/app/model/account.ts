export class Account {
    constructor(public name: string,
                public donatedCharities: string [],
                public donationAmount: number [],
                public datesDonated: string [],
                public paymentMethod: string [],
                public profilePicture: string,
                public email: string) {}

    public static JSONtoObj(obj: any): Account {
        return new Account(obj.name, obj.donatedCharities,
                            obj.donationAmount, obj.datesDonated,
                            obj.paymentMethod, obj.profilePicture,
                            obj.email);
    }

    public static createNewAccount(): Account {
        return new Account('', null, null, null, null, '', '');
    }
}
