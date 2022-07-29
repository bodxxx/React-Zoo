import React from 'react';
import axios from 'axios';
import styles from './Cart.module.scss';
import CartState from './CartState';
import { AppContext } from '../../App';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Cart({onCloseCart, onRemove, items =[], opened}) {
    const {cartItems, setCartItems} = React.useContext(AppContext);
    const [orderId, setOrderId] = React.useState(null);
    const [orderProcessed, setOrderProcessed] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://62cedb72486b6ce8264e112a.mockapi.io/orders', {items: cartItems,});
            setOrderId(data.id);
            setOrderProcessed(true);
            setCartItems([]);
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://62cedb72486b6ce8264e112a.mockapi.io/cart/' + item.id);
                await delay(500);
            }
        } catch (error) {
            alert('Упс, щось пішло не так..');
        }
        setIsLoading(false);
    }
    return(
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.cart}>
                <h2>
                    Кошик
                    <img src="img/btn-remove.svg" alt="Close" className={styles.removeBtn} onClick={onCloseCart}/>
                </h2>
                {items.length > 0 ? (
                <div className={styles.itemsWrapper}>
                    <div className={styles.items}>
                        {items.map((obj) => (
                        <div key={obj.id} className={styles.cartItem}>
                            <img width={70} height={70} src={obj.imgUrl} alt=""/>
                            <div>
                                <p>{obj.title}</p>
                                <b>{obj.price} грн.</b>
                            </div>
                            <img onClick={() => {onRemove(obj.id)}} src="img/btn-remove.svg" alt="Remove" className={styles.removeBtn}/>
                        </div>
                        ))}
                    </div>
                    <div className={styles.total}>
                        <ul>
                        <li>
                            <span>Разом:</span>
                            <div></div>
                            <b>{totalPrice} грн.</b>
                        </li>
                        <li>
                            <span>Податок 5%:</span>
                            <div></div>
                            <b>{(totalPrice / 100) * 5} грн.</b>
                        </li>
                        </ul>
                        <button disabled={isLoading} onClick={onClickOrder}>Оформити замовлення</button>
                    </div>
                </div> ) : (
                    <CartState 
                        title={orderProcessed ? "Замовлення оформлено" : "Ваш кошик порожній"}
                        description={orderProcessed ? `Ваше замовлення #${orderId} прийняте в обробку.` : "Додайте хоча б один товар"}
                        image={orderProcessed ? "img/order-processed.png" : "img/empty-cart.png"}
                        alt={orderProcessed? "Замовлення оформлено" : "Порожній кошик"}>
                    </CartState>
                )}
            </div>
        </div>
    );
}
export default Cart;