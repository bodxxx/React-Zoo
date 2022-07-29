import React from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

function Orders() {
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const totalOrdersPrice = orders.reduce((sum, obj) => obj.price + sum, 0);
    React.useEffect(() => {
       (async () => {
            try {
                const {data} = await axios.get('https://62cedb72486b6ce8264e112a.mockapi.io/orders');
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert('Упс, щось пішло не так.. Спробуйте пізніше.')
            }
       })();
    }, [])
    return(
        <div className="content">
            {(isLoading ? [...Array(10)] : orders).length > 0 ? (
                <div>
                    <div className="section-heading">
                        <h2>Мої замовлення</h2>
                    </div>
                    <p className="totalOrdersPrice">Загальна сумма ваших замовлень складає: <span>{totalOrdersPrice} грн.</span></p>
                    <div className="products">
                        {
                            (isLoading ? [...Array(10)] : orders).map((item, index) => (
                            <Card
                                key={index}
                                loading={isLoading}
                                {...item}/>
                            ))
                        }
                    </div>
                </div>
            ) : (
                <div className="emptyFavorites">
                    <img src="img/sad-face.png" alt="Sad emoji"/>
                    <h3>У вас немає замовлень</h3>
                    <p>
                        Це потрібно скоріше виправити, повертайтеся до магазину і замовте товар для свого пухнастого друга!
                    </p>
                    <Link to="">
                        <button>Повернутися назад</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Orders;