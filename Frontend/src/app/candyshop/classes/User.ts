class User {
	public Id: string | undefined = '';
	public Name: string = '';
	public Email: string = '';
	public Address: string = '';

	constructor(
		id: string | undefined,
		name: string,
		email: string,
		address: string
	) {
		this.Id = id;
		this.Name = name;
		this.Email = email;
		this.Address = address;
	}

	public static Empty(): User {
		return new User('', '', '', '');
	}
}

export default User;
