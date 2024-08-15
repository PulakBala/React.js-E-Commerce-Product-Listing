import { useState } from "react"

import ProductList from "./Components/ProductList/ProductList"
import SearchBar from "./Components/SearchBar/SearchBar"


function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  }
  return (
    <>
     <div className="App">
        <SearchBar onSearch={handleSearch}/>
        <ProductList searchQuery={searchQuery}/>
     </div>
    </>
  )
}

export default App
