import Money from './Money';

class LineItem {
	public Id: string | undefined = '';
	public CandyId: string | undefined = '';
	public CandyName: string = '';
	public CandyQuantity: number = 0;
	public CandyPrice: Money = Money.Empty();
	public CandyImage: string = '';
	public Quantity: number = 0;
	public Price: Money = Money.Empty();
	public IsDisabled: boolean = false;

	constructor(
		id: string | undefined,
		candyId: string | undefined,
		candyName: string,
		candyQuantity: number,
		candyPrice: Money,
		candyImage: string,
		quantity: number,
		price: Money,
		isDisabled: boolean
	) {
		this.Id = id;
		this.CandyId = candyId;
		this.CandyName = candyName;
		this.CandyQuantity = candyQuantity;
		this.CandyPrice = candyPrice;
		this.CandyImage = candyImage;
		this.Quantity = quantity;
		this.Price = price;
		this.IsDisabled = isDisabled;
	}

	public static Empty(): LineItem {
		return new LineItem(
			'',
			'',
			'',
			0,
			Money.Empty(),
			'',
			0,
			Money.Empty(),
			false
		);
	}
}

export default LineItem;
