import styles from "../styles/TemplateBanda.module.css"
const TemplateBanda = ({banda,setBanda,handleFavoritos}) => {
    return (
        <div className={styles.banda_container}>
            <div className={styles.info_container}>
                <div className={styles.img_container}>
                    <img src={banda.strArtistThumb} alt="" />
                    <span><b>Género musical: </b> {banda.strGenre}</span>
                    <span><b>Lugar de procedencia: </b> {banda.strCountry}</span>
                    <span><b>Año de formación: </b>  {banda.intFormedYear}</span>
                    
                    {JSON.parse(localStorage.getItem("favoritas")).includes(banda.strArtist)?
                    <button 
                    className={styles.button_remover}
                    onClick={()=>handleFavoritos(banda.strArtist)}
                    >Remover de bandas favoritas</button>
                    :
                    <button 
                    className={styles.button_agregar}
                    onClick={()=>handleFavoritos(banda.strArtist)}
                    >Agregar a bandas favoritas</button>
                    }
                </div>
                <div className={styles.text_container}>
                    <h4>{banda.strArtist}</h4>
                    <p>{banda.strBiographyES||banda.strBiographyEN}</p>
                    
                </div>
            <button className={styles.button_cerrar} onClick={()=>setBanda(null)}><i className="fa-solid fa-x"></i></button>
            </div>
        </div>
    )
}

export default TemplateBanda
