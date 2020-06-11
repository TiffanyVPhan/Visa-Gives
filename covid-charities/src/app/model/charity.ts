export class Charity {
    constructor(public name: string,
                public description: string,
                public tags: string [],
                public coverPhoto: string,
                public additionalPhotos: string [],
                public donationTiers: number []) {}
}
