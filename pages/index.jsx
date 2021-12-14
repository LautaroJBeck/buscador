
import styles from "../styles/Home.module.css"
import Head from "next/head"
import TemplateBanda from "../components/TemplateBanda"
import { useState,useEffect } from "react"
import Loading from "../components/Loading"
import MensajeError from "../components/MensajeError"
import BandaFavorita from "../components/BandaFavorita"
export default function Home() {

  const [banda, setBanda] = useState(null)
  const [buscador,setBuscador]=useState("")
  const [loading,setLoading]=useState(false)
  const [loadingFavoritas,setLoadingFavoritas]=useState(false)
  const [mensajeError,setMensajeError]=useState(false)
  const [bandasFavoritas,setBandasFavoritas]=useState([])
  const [modificador,setModificador]=useState(0)
  const handleSubmit=async(e)=>{
    e.preventDefault()
    setMensajeError(false)
    setLoading(true)
    try{
      if(!buscador){
        setLoading(false)
        return
      }
      let buscadorLowerCase=buscador.toLowerCase()
      console.log(buscadorLowerCase)
      let res=await fetch(`https://theaudiodb.com/api/v1/json/2/search.php?s=${buscadorLowerCase}`)
      let json=await res.json()
      setBanda(json.artists[0])
    }catch(err){
      setMensajeError(true)
    }
    setLoading(false)
    
  }
  const handleFavoritos=(nombre)=>{
    const updated=JSON.parse(localStorage.getItem("favoritas"))||[];
    const isFavorite=updated.indexOf(nombre)
    if(isFavorite>=0){
        updated.splice(isFavorite,1);
    }else{
        updated.push(nombre)
    }
    localStorage.setItem("favoritas",JSON.stringify(updated)) 
    setModificador(modificador+1)
  }
  const funcionInicio=async()=>{
    if(localStorage.getItem("favoritas")){
      setLoadingFavoritas(true)
      let nombreBandas=JSON.parse(localStorage.getItem("favoritas"));
      let bandasArray=await Promise.all(
          nombreBandas.map(async el=>{
          let res=await fetch(`https://theaudiodb.com/api/v1/json/2/search.php?s=${el}`);
          let json=await res.json();
          return json.artists[0]
        })
      )
      console.log(bandasArray)
      setBandasFavoritas(bandasArray)
      setLoadingFavoritas(false)
    }else{
      localStorage.setItem("favoritas",JSON.stringify([]))
    }
  }

  useEffect(() => {
    funcionInicio()
  }, [modificador])
  return (
   <>
      <header className={styles.header_container}>
        <Head>
        <title>Lautaro Beck - Buscador de artistas</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Poppins:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </Head>
        <div>
          <h4>Buscador de artistas</h4>
          <form onSubmit={(e)=>handleSubmit(e)} className={styles.search_container}>
            <input 
            placeholder="Busca algun artista. Ej: Coldplay, Bruno Mars " 
            onChange={(e)=>setBuscador(e.target.value)}
            type="text" 
            name="nombre_banda"
            />
            <button>Buscar</button>
          </form>
        </div>
            {loading&&<Loading/>}
            {mensajeError&&<MensajeError texto="No se pudo encontrar la banda que buscabas"/>}
      </header>
      <main className={styles.main_container}>
        <div className={styles.favoritas_titles_container}>
          <h4>Artistas favoritos:</h4>
        </div>
        {loadingFavoritas&&<Loading/>}
        <article className={styles.favoritas_templates_container}>
          {bandasFavoritas.length>0&&bandasFavoritas.map((el,key)=>(
            <BandaFavorita key={key} setBanda={setBanda} banda={el}/>
          ))}
          {!loadingFavoritas&&bandasFavoritas.length==0&&<MensajeError texto="No tienes ninguna banda marcada como favorita"/>}
        </article>
      </main>
        {banda&&<TemplateBanda banda={banda} setBanda={setBanda} bandasFavoritas={bandasFavoritas} handleFavoritos={handleFavoritos}/>}
   </>
  )
}
