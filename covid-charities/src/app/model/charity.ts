export class Charity {
    constructor(public name: string,
                public description: string,
                public tags: string [],
                public coverPhoto: string,
                public additionalPhotos: string [],
                public donationTiers: number [],
                public summary: string,
                public money: string) {}

    public static JSONtoObj(obj: any): Charity {
        return new Charity(obj.name, obj.description, obj.tags,
                            obj.coverPhoto, obj.additionalPhotos,
                            obj.donationTiers, obj.summary, obj.money);
    }
}
