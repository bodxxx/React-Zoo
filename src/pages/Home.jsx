import React from 'react';
import Card from '../components/Card';
function Home({searchValue, items, onChangeSearchInput, onAddToCart, addToFavorite, isLoading}) {
    const renderItems = () => {
        const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()),);
        return(isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
                <Card
                    key={index}
                    addToCart={(obj) => onAddToCart(obj)}
                    addToFav={(obj) => addToFavorite(obj)}
                    loading={isLoading}
                    {...item}
                />
            ));
    };

    return(
        <div className="content">
            <div className="section-heading">
            <h2>{searchValue ? `Пошук: "${searchValue}"` : 'Всі товари'}</h2>
            <div className="search-block">
                <img src="/img/search.svg" alt="Search"/>
                <input onChange={onChangeSearchInput} placeholder="Пошук..."/>
            </div>
            </div>
            <div className="products">
                {renderItems()}
            </div>
        </div>
    );
}

export default Home;