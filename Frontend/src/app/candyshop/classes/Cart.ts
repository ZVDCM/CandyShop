import Candy from './Candy';
import LineItem from './LineItems';
import Money from './Money';

class Cart {
	public Id: string | undefined;
	public UserId: string = '';
	public UserName: string = '';
	public UserEmail: string = '';
	public UserAddress: string = '';
	public TotalPrice: Money = Money.Empty();
	public LineItems: LineItem[] = [];

	constructor(
		id: string | undefined,
		userId: string,
		userName: string,
		userEmail: string,
		userAddress: string,
		totalPrice: Money,
		lineItems: LineItem[]
	) {
		this.Id = id;
		this.UserId = userId;
		this.UserName = userName;
		this.UserEmail = userEmail;
		this.UserAddress = userAddress;
		this.TotalPrice = totalPrice;
		this.LineItems = lineItems;
	}

	public static Empty(): Cart {
		return new Cart('', '', '', '', '', Money.Empty(), []);
	}

	public IsEqual(cart: Cart): boolean {
		return this.Id === cart.Id;
	}

	public UpdateLineItem(candy: Candy) {
		this.LineItems = this.LineItems.map((lineItem) => {
			if (lineItem.CandyId !== candy.Id) return lineItem;
			lineItem.CandyName = candy.Name;
			lineItem.CandyImage = candy.Image;
			lineItem.CandyQuantity = candy.Quantity;
			lineItem.IsDisabled = lineItem.Quantity > candy.Quantity;
			lineItem.Price = new Money(
				lineItem.Price.Currency,
				lineItem.Price.Value - lineItem.CandyPrice.Value + candy.Price.Value
			);
			lineItem.CandyPrice = candy.Price;
			return lineItem;
		});
	}

	public DisableLineItem(candy: Candy) {
		this.LineItems = this.LineItems.map((lineItem) => {
			if (lineItem.CandyId !== candy.Id) return lineItem;
			lineItem.CandyId = undefined;
			lineItem.IsDisabled = true;
			return lineItem;
		});
	}
}

export default Cart;
