import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

const SearchBar = ({
  placeholder = 'input search text',
  className = '',
  autoFocus = false,
}: SearchBarProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get('search') || '';

  const [searchInput, setSearchInput] = useState(urlQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchInput(urlQuery);
    }, 0);
    return () => clearTimeout(timer);
  }, [urlQuery]);

  const executeSearch = () => {
    if (searchInput.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeSearch();
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        fill="none"
        viewBox="0 0 17 17"
      >
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          d="M16 16l-3-3"
        />
      </svg>
      <input
        type="search"
        placeholder={placeholder}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleSearchKeyDown}
        autoFocus={autoFocus}
        className="w-full h-10 pl-11 pr-4 py-2 bg-[#F5F5F5] dark:bg-muted/40 border border-[#F5F5F5] dark:border-border hover:border-primary focus:border-primary rounded-full text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none transition-all"
      />
    </div>
  );
};

export default SearchBar;
