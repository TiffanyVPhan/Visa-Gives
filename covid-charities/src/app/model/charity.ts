export class Charity {
    constructor(public name: string,
                public description: string,
                public tags: string [],
                public coverPhoto: string,
                public additionalPhotos: string [],
                public summary: string,
                public money: string,
                public charityLink: string,
                public cardNumber: number,
                public exp: string,
                public cvv: number) {}
}
