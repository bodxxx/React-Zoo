import React from 'react';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

function Favorites({addToFavorite}) {
    const {favorites, onAddToCart} = React.useContext(AppContext);
    return(
        <div className="content">
            {favorites.length > 0 ? (
                <div>
                    <div className="section-heading">
                        <h2>Список бажань</h2>
                    </div>
                    <div className="products">
                        {
                            favorites.map((item, index) => (
                            <Card
                                key={index}
                                favorited={true}
                                addToFav={addToFavorite}
                                addToCart={(obj) => onAddToCart(obj)}
                                {...item}
                            />
                            ))
                        }
                    </div>
                </div>
            ) : (
                <div className="emptyFavorites">
                    <img src="/img/sad-face.png" alt="Sad emoji"/>
                    <h3>У вас ще нічого немає у списку бажань</h3>
                    <p>
                        Саме час додати перший товар
                    </p>
                    <Link to="/">
                        <button>Повернутися назад</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Favorites;