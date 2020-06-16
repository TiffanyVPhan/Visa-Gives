export class Charity {
    constructor(public name: string,
                public description: string,
                public tags: string [],
                public coverPhoto: string,
                public additionalPhotos: string [],
                public donationTiers: number []) {}

    public static JSONtoObj(obj: any): Charity {
        return new Charity(obj.name, obj.description, obj.tags,
                            obj.coverPhoto, obj.additionalPhotos,
                            obj.donationTiers);
    }
}
