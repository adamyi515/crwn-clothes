import './App.css';

// react-router-dom
import { Routes, Route } from 'react-router-dom';

// Routes
import HomePage from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';
import ShopPage from './routes/shop/shop.component';


function App() {
  
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<HomePage />} />
          <Route path='shop' element={<ShopPage />} />
          <Route path='auth' element={<Authentication />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
