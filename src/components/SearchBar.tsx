import { useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <InputGroup className="mb-4 shadow-sm">
      <InputGroup.Text>
        <FaSearch />
      </InputGroup.Text>
      <FormControl
        placeholder="חפש כרטיס לפי כותרת..."
        value={query}
        onChange={handleInputChange}
        className="bg-light"
      />
    </InputGroup>
  );
};

export default SearchBar;
