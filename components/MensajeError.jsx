import styles from "../styles/MensajeError.module.css"
const MensajeError = ({texto}) => {
    return (
        <div className={styles.mensaje_error_container}>
            <span>{texto}</span>
        </div>
    )
}

export default MensajeError
