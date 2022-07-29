import styles from './Offer.module.scss';
function Offer() {
    return (
        <div className={styles.offer}>
            <div className={styles.offerIntro}>
                <img src="img/paw.png" alt=""/>
                <h1>
                    Товари для
                    <span> Хвостатих!</span>
                </h1>
                <a href="/#" className={styles.mainBtn}>Знижки</a>
            </div>
            <img src="img/banner.png" alt="" className={styles.bannerImg}/>
      </div>
    );
}
export default Offer;