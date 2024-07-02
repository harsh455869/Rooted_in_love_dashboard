import React from 'react'
import CategoryList from './pages/category/categoryList'
import SliderList from './pages/slider/sliderList'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserList from './pages/user/userList'
import VideoList from './pages/videos/videoList'
import SubCategoryList from './pages/subcategory/subCategoryList'
import ProductList from './pages/product/productList'
import HealthConditionList from './pages/healthconditions/healthConditionList'
function App() {
  return (
    <BrowserRouter>
      <Routes> 
        {/* <Route path="/" element={ <Login></Login> } /> */}
        {/* Product, buyer, seller */}
         {/* <Route path="/hotels" element={<HotelsList></HotelsList>} /> */}
         {/* <Route path="/sliders" element={<SliderList/>} />
        
         } />
        
          */}
         <Route path="/" element={<UserList/>} /> 
         <Route path="/subcategories" element={<SubCategoryList/>} />
         <Route path="/categories" element={<CategoryList/>} />
         <Route path="/videos" element={<VideoList/>}/>
         <Route path="/products" element={<ProductList/>} />
         <Route path="/healthconditions" element={<HealthConditionList/>} />
         {/*  
         <Route path="/societies" element={<SocietyList></SocietyList>} />  */}

      </Routes>
    </BrowserRouter>
  )
}

export default App