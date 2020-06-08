export class Charity {
    public title: string;
    public description: string;
    public tags: string [];
    public coverPhoto: string;
    public moneyRaised: number;
    public targetAmount: number;

    constructor(t: string, d: string, tag: string[], cp: string, mr: number, ta: number) {
        this.title = t;
        this.description = d;
        this.tags = tag;
        this.coverPhoto = cp;
        this.moneyRaised = mr;
        this.targetAmount = ta;
    }
}
