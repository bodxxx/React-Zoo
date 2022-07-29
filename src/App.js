import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import axios from 'axios';
import Header from './components/Header';
import Offer from './components/Offer';
import Cart from './components/Cart';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    async function fetchData() {
     try {
      const cartItemsResponse = await axios.get('https://62cedb72486b6ce8264e112a.mockapi.io/cart');
      const favoritesResponse = await axios.get('https://62cedb72486b6ce8264e112a.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://62cedb72486b6ce8264e112a.mockapi.io/items');
    
      setIsLoading(false);
      setCartItems(cartItemsResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
     } catch (error) {
        alert('Щось пішло не так :( Спробуйте повторити операцію пізніше..');
     }
    }

    fetchData();
  }, []);
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://62cedb72486b6ce8264e112a.mockapi.io/cart/${findItem.id}`);
      } else {
          setCartItems((prev) => [...prev, obj]);
          const { data } = await axios.post('https://62cedb72486b6ce8264e112a.mockapi.io/cart', obj);
          setCartItems((prev) => prev.map(item => {
            if (item.parentId === data.parentId) {
              return {
                ...item, 
                id: data.id
              };
            }
            return item;
          }));
      }
    } catch(error) {
        alert('Упс, щось пішло не так..');
    }
  }
  const removeItem = (id) => {
    try {
      axios.delete(`https://62cedb72486b6ce8264e112a.mockapi.io/cart/${id}`);
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
    } catch (error) {
        alert('Помилка при видаленні товару. Спробуйте ще раз через хвилину.')
    }
  }
  const addToFavorite = async (obj) => {
    try {
      if(favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://62cedb72486b6ce8264e112a.mockapi.io/favorites/${obj.id}`);
      } else {
        const {data} = await axios.post('https://62cedb72486b6ce8264e112a.mockapi.io/favorites', obj);
        setFavorites(prev => [...prev, data]);
      }
    } catch(error) {
        alert('Упс, щось пішло не так..');
    }
  }
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const addedToCart = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  }

  return (
    <AppContext.Provider value={{favorites, items, cartItems, addedToCart, setCartOpened, setCartItems, onAddToCart}}>
      <div className="wrapper">
        <Cart items={cartItems} onCloseCart={() => setCartOpened(false)} onRemove={removeItem} opened={cartOpened}/>
        <Header 
          onClickCart={() => setCartOpened(true)}
        />
        <Offer/>
        <Routes>
          <Route path="/React-Zoo" element={<Home searchValue={searchValue}
                items={items}
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                addToFavorite={addToFavorite}
                cartItems={cartItems}
                isLoading={isLoading}
            />} exact/>
          <Route path="/React-Zoo/favorites" element={<Favorites addToFavorite={addToFavorite}/>}/>
          <Route path="/React-Zoo/orders" element={<Orders/>}/>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;