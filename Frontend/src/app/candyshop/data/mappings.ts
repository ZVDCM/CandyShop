import Candy from '../classes/Candy';
import Cart from '../classes/Cart';
import LineItem from '../classes/LineItems';
import Money from '../classes/Money';
import User from '../classes/User';
import { CandyResponse } from '../graphql/candies/candy-types';
import { CartResponse } from '../graphql/carts/cart-types';
import { UserResponse } from '../graphql/users/user-types';

export function MapToUser(response: UserResponse): User {
	return new User(response.id, response.name, response.email, response.address);
}
export function MapToCandy(response: CandyResponse): Candy {
	return new Candy(
		response.id!,
		response.name!,
		response.quantity!,
		new Money(response.price.currency!, response.price.value!),
		response.image!
	);
}
export function MapToCart(response: CartResponse): Cart {
	return new Cart(
		response.id,
		response.userId,
		response.userName,
		response.userEmail,
		response.userAddress,
		new Money(response.totalPrice.currency, response.totalPrice.value),
		response.lineItems.map(
			(lineItem) =>
				new LineItem(
					lineItem.id,
					lineItem.candyId,
					lineItem.candyName,
					lineItem.candyQuantity,
					new Money(lineItem.candyPrice.currency, lineItem.candyPrice.value),
					lineItem.candyImage,
					lineItem.quantity,
					new Money(lineItem.price.currency, lineItem.price.value),
					lineItem.isDisabled
				)
		)
	);
}
