import './App.css';

// react-router-dom
import { Routes, Route } from 'react-router-dom';

// Routes
import HomePage from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';


const ShopPage = () => {
  return(
    <h1>Shop Page</h1>
  )
}


function App() {
  
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<HomePage />} />
          <Route path='shop' element={<ShopPage />} />
          <Route path='auth' element={<Authentication />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
