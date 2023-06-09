import "./App.css";
import {
  Box,
  TextField,
  Grid,
  ListItem,
  List,
  Container,
  Card,
  Button,
  CardHeader,
  CardMedia,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import bg from "./img/bg-char.jpg";

function App() {
  // Seteo del listado
  const [listado, setListado] = useState([]);
  // Seteo del listado filtrado
  const [filtro, setFiltro] = useState([]);
  // Seteo de lista de seleccionados
  const [seleccionados, setSeleccionados] = useState([]);
  // Seteo del buscador
  const [buscador, setBuscador] = useState("");

  // Detalles de pokemon
  const [detallesPokemon, setDetallesPokemon] = useState([]);

  // Funcion para obtener listado de 151 pokemones
  const getPokemons = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        setListado(response.data.results);
      });
  };

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    if (buscador.trim() !== "") {
      let resultado = listado.filter((item, index) =>
        item.name.toString().includes(buscador.toString().trim())
      );
      setFiltro(resultado);
    }
  }, [buscador]);

  // Funcion para obtener el valor del TextField (buscador)
  const handleInputChange = (event) => {
    // Desestructuracion de event.target para obtener el valor del input
    const { value } = event.target;
    // Actualizacion del valor Buscador
    setBuscador(value);
  };

  // Funcion para agregar pokemon a la lista de seleccionados

  const agregar = (pokemon) => {
    let id = listado.indexOf(pokemon) + 1;
    obtenerDetalles(id);
  };

  const obtenerDetalles = (id) => {
    axios.get("https://pokeapi.co/api/v2/pokemon/" + id).then((response) => {
      setDetallesPokemon(response.data);
    });
  };

  return (
    <>
      <Container sx={{ backgroundColor: "#d30a40" }}>
        <Box sx={{ width: "100%", backgroundColor: "#d30a40" }}>
          <div className="pokedex-header">
            <div className="celest-circle"></div>
            <div className="red-circle"></div>
            <div className="yellow-circle"></div>
            <img
              className="logo"
              src="./src/img/PokeDex.png"
              alt="Descripción de la imagen"
            />
          </div>
          <TextField
            label="Buscar pokemon"
            type="text"
            variant="outlined"
            value={buscador}
            onChange={handleInputChange}
            style={{ width: "50%", backgroundColor: "#8fc096"} }
          />
        </Box>
 
        <Box marginTop={"20px"}>
          <Grid container justifyContent="space-evenly">
            {/* Listado */}
            <Grid bgcolor={"#a40c35"} color={"white"} item xs={3}>
              <List>
                {listado.map((pokemon, index) => (
                  <ListItem key={index}>
                    {index + 1}.
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        index + 1
                      }.png`}
                      alt="pokemon"
                    />
                    {pokemon.name}
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Listado filtrado */}
            <Grid bgcolor={"#a40c35"} color={"white"} item xs={3}>
              <List>
                {filtro.map((pokemon) => (
                  <ListItem key={pokemon.name}>
                    {listado.indexOf(pokemon) + 1}.
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        listado.indexOf(pokemon) + 1
                      }.png`}
                      alt="pokemon"
                    />
                    {pokemon.name}
                    <Button
                      size="small"
                      variant="contained"
                      color="warning"
                      style={{ marginLeft: "10px", fontSize: "10px", backgroundColor: "#ffcd00", color: "black" }}
                      onClick={() => agregar(pokemon)}
                    >
                      Ver
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Grid>
            {/* Lista de seleccionados */}
            <Grid bgcolor={"#a40c35"} item xs={3}>
              <Card style={{ marginBottom: "20px" }}>
                <CardMedia
                  style={{ backgroundColor: "#97cb97" }}
                  component={"img"}
                  image={detallesPokemon?.sprites?.front_default}
                />
                <CardContent>
                  <h3>{`${detallesPokemon?.name?.charAt(0).toUpperCase()}${detallesPokemon?.name?.slice(1)} N.° ${detallesPokemon?.id}`}</h3>
                  <h4>Habilidades:</h4>
                  {
                    detallesPokemon?.abilities?.map((item) => (
                    <li style={{listStyle: "none",textAlign: "center"}}>
                        {item.ability.name}
                    </li>
                    ))
                  }
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default App;
