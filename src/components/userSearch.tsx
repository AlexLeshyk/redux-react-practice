import axios from "axios";
import useDebounce from "../hooks/useDebounce";
import { IUserFilter } from "../types/users";

interface UserFilterProps {
  filter: IUserFilter;
  setFilter: (value: IUserFilter) => void;
}

const UserSearch: React.FC<UserFilterProps> = ({ filter, setFilter }) => {
  const searchQuery = async (query: unknown) => {
    console.log(query);
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users?query=${query}`);
    console.log(response);
  };
  const debouncedSearch = useDebounce(searchQuery, 500);

  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, query: e.target.value });
    debouncedSearch(e.target.value);
  };
  return (
    <div>
      <label htmlFor="user-search">Search by name: </label>
      <input id="user-search" type="search" value={filter.query} onChange={onSearchHandler} />
      <select
        value={filter.sort}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setFilter({ ...filter, sort: e.target.value });
        }}
      >
        <option disabled value="">
          Sort by...
        </option>
        <option value="email">By email</option>
        <option value="name">By name</option>
        <option value="username">By userName</option>
        <option value="city">By city</option>
      </select>
    </div>
  );
};

export default UserSearch;
