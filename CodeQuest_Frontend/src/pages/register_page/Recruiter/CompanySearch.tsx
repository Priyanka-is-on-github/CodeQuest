// components/CompanySearch.tsx
import { useState, useEffect } from 'react';

// import { searchCompanies } from '../api/companyApi';

export interface Company {
  id: string;
  name: string;
  logo?: string;
}

const CompanySearch = ({ onCompanySelect }: any) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Company | null>(null);
  const [isSearching, setIsSearching] = useState(false);


  useEffect(() => {
    if (query.trim().length > 2) {
      const timer = setTimeout(async () => {
        setIsSearching(true);
        try {
          const response = await fetch(`http://localhost:3001/api/v1/auth/companies/search?query=${encodeURIComponent(query)}`);
          
            const {data} = await response.json()

            

            if(data.msg === 'Name not found'){
                setResults(null);
            }
            else{
                setResults(data);
            }
                
        } catch (error) {
          console.error('Search failed:', error);
        } finally {
          setIsSearching(false);
        }
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setResults(null);
    }
  }, [query]);


 
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Company</h2>
      
      <div className="relative mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for your company..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
        {isSearching && (
          <div className="absolute right-3 top-3.5">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {results != null && (
        <div className="space-y-2 max-h-60 overflow-y-auto bg-gray-100 rounded-lg">
          
            <div
              key={results?.id}
              onClick={() => onCompanySelect(results)}
              className="flex items-center p-3 hover:bg-gray-200 rounded-lg cursor-pointer transition"
            >
              {results.logo && (
                <img 
                  src={results.logo} 
                  alt={results.name}
                  className="w-10 h-10 object-contain mr-3"
                />
              )}
              <span className="font-medium text-gray-700">{results?.name}</span>
            </div>
        
        </div>
      )}

      {query && results === null && !isSearching && (
        <div className="text-center py-4">
          <p className="text-gray-600 mb-4">Company not found?</p>
          <button
            onClick={() => onCompanySelect({ id: 'new', name: query })}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Continue with "{query}"
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanySearch;