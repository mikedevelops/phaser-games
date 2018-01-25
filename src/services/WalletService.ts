export default class WalletService {
    constructor (
        private currency = '$',
        private balance: number = 50.00
    ) {}

    public getBalance (): number {
        return this.balance;
    }

    public getCurrency (): string {
        return this.currency;
    }

    public add (
        amount: number
    ): number {
        return this.balance += amount;
    }

    public subtract (
        amount: number
    ): number {
        return this.balance -= amount;
    }

    public printBalance (): string {
        return `${this.currency}${this.balance.toFixed(2)}`;
    }
}
