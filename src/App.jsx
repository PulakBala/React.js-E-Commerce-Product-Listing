import { useState } from "react"
// import FilterBar from "./Components/FilterBar/FilterBar"
import ProductList from "./Components/ProductList/ProductList"
import SearchBar from "./Components/SearchBar/SearchBar"
// import SortOptions from "./Components/SortOptions/SortOptons"

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  }
  return (
    <>
     <div className="App">
      <h1>Product Listing</h1>
        <SearchBar onSearch={handleSearch}/>
        {/* <FilterBar/> */}
        {/* <SortOptions/> */}
        <ProductList searchQuery={searchQuery}/>
     </div>
    </>
  )
}

export default App
