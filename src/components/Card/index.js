import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';
import { AppContext } from '../../App';
function Card({
    id, 
    addToFav, 
    addToCart, 
    imgUrl, 
    title, 
    price, 
    favorited = false, 
    // inCart = false, 
    loading = false}) {
    const {addedToCart} = React.useContext(AppContext);
    const [favorite, setFavorite] = React.useState(favorited);
    const objProps = {id, parentId: id, imgUrl, title, price};
    const onClickPlus = () => {
        addToCart(objProps);
    }
    const onClickFav = () => {
        addToFav(objProps);
        setFavorite(!favorite);
    }
    return (
        <div className={styles.card}>
            { loading ?
            <ContentLoader 
                speed={2}
                width={140}
                height={227}
                viewBox="0 0 140 227"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="10" ry="10" width="140" height="135" /> 
                <rect x="0" y="145" rx="5" ry="5" width="140" height="15" /> 
                <rect x="0" y="165" rx="5" ry="5" width="100" height="15" /> 
                <rect x="0" y="200" rx="5" ry="5" width="80" height="24" /> 
                <rect x="107" y="194" rx="10" ry="10" width="32" height="32" />
            </ContentLoader> : 
            <>
            <div className={styles.favorite} onClick={onClickFav}>
              {addToFav && (<img src={favorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="Unliked"/>)}
            </div>
            <img width={133} height={135} src={imgUrl} alt="Purina"/>
            <p>{title} </p>
            <div className={styles.cardBottom}>
                <div>
                    <span>Ціна:</span>
                    <b>{price} грн.</b>
                </div>
                <button onClick={onClickPlus}>
                    {addToCart && (<img src={addedToCart(id) ? "/img/btn-checked.svg" : "/img/btn.svg"} alt="add to cart"/>)}
                </button>
            </div>
            </>
            }
        </div>
    );
}
export default Card;