import { FC, useState } from "react";
import { IUser } from "../types/users";

interface UserFormProps {
  onAdd: (value: IUser) => void;
  maxId: number;
  onCloseForm: () => void;
}

const UserForm: FC<UserFormProps> = ({ onAdd, maxId, onCloseForm }) => {
  const [inputValue, setInputValue] = useState<{
    name: string;
    userName: string;
    city: string;
    email: string;
    street: string;
    suite: string;
    zipcode: string;
  }>({
    name: "",
    userName: "",
    city: "",
    email: "",
    street: "",
    suite: "",
    zipcode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateForm();
  };

  const validateForm = () => {
    if (
      inputValue.name.length < 3 ||
      inputValue.city.length < 3 ||
      inputValue.street.length < 3 ||
      !inputValue.userName
    ) {
      return;
    }
    const user: IUser = {
      name: inputValue.name,
      username: inputValue.userName,
      email: inputValue.email,
      address: {
        city: inputValue.city,
        street: inputValue.street,
        suite: inputValue.suite,
        zipcode: inputValue.zipcode,
      },
      id: maxId++,
    };
    onAdd(user);
    setInputValue({
      ...inputValue,
      name: "",
      userName: "",
      email: "",
      city: "",
      street: "",
      suite: "",
      zipcode: "",
    });
    onCloseForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add user form</h3>
      <div className="form-control">
        <label htmlFor="username">UserName: </label>
        <input
          type="text"
          id="username"
          name="userName"
          value={inputValue.userName}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={inputValue.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="email">E-mail: </label>
        <input
          type="text"
          id="email"
          name="email"
          value={inputValue.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          name="city"
          value={inputValue.city}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="street">Street: </label>
        <input
          type="text"
          id="street"
          name="street"
          value={inputValue.street}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="suite">Suite: </label>
        <input
          type="text"
          id="suite"
          name="suite"
          value={inputValue.suite}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="zip">Zipcode: </label>
        <input
          type="text"
          id="zip"
          name="zipcode"
          value={inputValue.zipcode}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control">
        <button className="button button__main button__long" type="submit">
          <div className="inner">Add user</div>
        </button>
      </div>
    </form>
  );
};

export default UserForm;
