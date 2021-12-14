import styles from "../styles/BandaFavorita.module.css"


const BandaFavorita = ({banda,setBanda}) => {
    console.log(banda)
    return (
        <div className={styles.template_banda_container}>
            <div className={styles.img_template_container}>
                <img src={banda.strArtistThumb} alt="Banda" />
            </div>
            <div className={styles.text_template_container}>
                <span className={styles.text_template_container_title}><b>{banda.strArtist}</b></span>
                <div>
                    <span>{banda.strGenre}</span>
                    <span>{banda.intFormedYear}-{banda.intDiedYear||"Actualidad"}</span>
                </div>
                <span 
                onClick={()=>setBanda(banda)}
                className={styles.span_link}>Ver más...</span>
            </div>
        </div>
    )
}

export default BandaFavorita
