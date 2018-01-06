import 'phaser-ce';

export default class CurrencyService {
    private price: number;
    private interval: number;
    private diff: number;
    private ticks: number;

    constructor (
        private rnd: Phaser.RandomDataGenerator,
        private name: string,
        private code: string,
        private tradeInterval: number = 500,
        startPrice: number = 0,
    ) {
        this.price = startPrice;
        this.diff = 0;
        this.ticks = 0;
    }

    public update () {
        // Update at a third of the FPS
        if (this.ticks === 0 || this.ticks % (60 / this.tradeInterval) === 0) {
            // TODO: inject Utils this (somehow?)
            const moon: boolean = Phaser.Utils.chanceRoll(1);
            const crash: boolean = Phaser.Utils.chanceRoll(0.25);
            let min: number;
            let max: number;
            let amount: number;

            // if (crash) {
            //     console.log('WE ARE CRASHING 💥');
            //     min = (this.price / 3) * -1;
            //     max = (this.price / 4) * -1;
            // } else if (moon) {
            //     console.log('WE ARE MOONING 🚀🌝');
            //     min = (this.price / 4);
            //     max = (this.price / 3);
            // } else {
            //     min = this.rnd.frac();
            //     max = this.rnd.frac();
            // }

            // higher trader intervals will yield higher price differences
            amount = this.rnd.between(-50, 55) / (200 * this.tradeInterval);

            this.diff = amount;
            this.price += amount;
        }

        this.ticks++;
    }

    public getCurrencyCode (): string {
        return this.code;
    }

    public getPrice (): number {
        return this.price;
    }

    public getDiff (): number {
        return this.diff;
    }
}
