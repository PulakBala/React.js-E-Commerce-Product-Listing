import FilterBar from "./Components/FilterBar/FilterBar"
import ProductList from "./Components/ProductList/ProductList"
import SearchBar from "./Components/SearchBar/SearchBar"
import SortOptions from "./Components/SortOptions/SortOptons"

function App() {
  return (
    <>
     <div className="App">
      <h1>Product Listing</h1>
        {/* <SearchBar/> */}
        {/* <FilterBar/> */}
        {/* <SortOptions/> */}
        <ProductList/>
     </div>
    </>
  )
}

export default App
