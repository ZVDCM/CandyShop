class Money {
	public Currency: string = '';
	public Value: number = 0;

	constructor(currency: string, value: number) {
		this.Currency = currency;
		this.Value = value;
	}

    public static Empty(): Money {
        return new Money('', 1);
    }
}

export default Money;