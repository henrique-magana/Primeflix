import { useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import './filme-info.css';
import api from '../../services/api';

function Filme(){

    const {id} = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilm(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "768deb929c9483cf5c7cd8e498b81892",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                setFilme(response.data);

                setLoading(false);
            })
            .catch(() =>{
                console.log("Filme nao encontrado")
                navigate("/", {replace: true})
                return;
            })
        }

    loadFilm();


        return() => {
            console.log("Componente foi desmontado")
        }

    }, [navigate, id])



    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvos) =>filmesSalvos.id === filme.id)

        if(hasFilme){
            alert("Esse filme ja ta na lista")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        alert("Filme salvo ")
    }

if(loading){
    return(
        <div className='filme-info'>
            <h1>Carregando detalhes</h1>
        </div>
    )
}


    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>


            <h3>Sinppse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliacao: {filme.vote_average} /10</strong>


            <div className='area-button'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}

export default Filme;