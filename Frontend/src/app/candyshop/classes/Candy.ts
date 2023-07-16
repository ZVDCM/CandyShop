import Money from './Money';

class Candy {
	public Id: string | undefined = '';
	public Name: string = '';
	public Quantity: number = 0;
	public Image: string = '';
	public Price: Money = Money.Empty();

	constructor(
		id: string | undefined,
		name: string,
		quantity: number,
		price: Money,
		image: string,
	) {
		this.Id = id;
		this.Name = name;
		this.Quantity = quantity;
		this.Price = price;
		this.Image = image;
	}

	public static Empty(): Candy {
		return new Candy('', '', 1, Money.Empty(), '');
	}
}

export default Candy;
