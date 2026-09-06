import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useProducts } from "../context/ProductContext";
import { useDebounce } from "../hooks/useDebounce";

const SearchBar = ({ compact = false, autoFocus = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchTerm, setSearchTerm } = useProducts();
  const [value, setValue] = useState(searchTerm);
  const debouncedValue = useDebounce(value, 250);

  useEffect(() => {
    setValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    setSearchTerm(debouncedValue);
  }, [debouncedValue, setSearchTerm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(value);
    if (location.pathname !== "/products") navigate("/products");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative w-full ${compact ? "max-w-sm" : "max-w-2xl"}`}
    >
      <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        autoFocus={autoFocus}
        className={`input-field pl-11 ${compact ? "py-2.5" : "py-3.5"}`}
        placeholder="Search products, brands, categories"
        type="search"
      />
    </form>
  );
};

export default SearchBar;
