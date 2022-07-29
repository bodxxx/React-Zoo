import React from 'react';
import styles from './Cart.module.scss';
import { AppContext } from '../../App';

const CartState = ({title, image, description, alt}) => {
    const {setCartOpened} = React.useContext(AppContext);
    return (
        <div className={styles.emptyCart}>
            <img src={image} alt={alt}/>
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={() => setCartOpened(false)}>Повернутися до товарів</button>
    </div>
    )
}
export default CartState;