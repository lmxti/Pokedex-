import { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import axios from "axios";

function App() {

  // Buscador
  const [buscador, setBuscador] = useState("");
  // Listado original
  const [listado, setListado] = useState([]);
  // Listado filtrado
  const [listaAux, setListaAux] = useState([]);
  // Lista de pokemones seleccionados
  const [listaTres, setListaTres] = useState([]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBuscador(value);
  };

  const obtenerPoke = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        setListado(response.data.results);
      });
  };


  useEffect(() => {
    obtenerPoke();
  }, []);

  useEffect(() => {
    if (buscador.trim() !== "") {
      let result = listado.filter((item) =>
        item.name.toString().includes(buscador.toString().trim())
      );
      setListaAux(result);
    } else {
      setListaAux([]);
    }
  }, [buscador]);

  //      https://javascript.plainenglish.io/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc
  //  https://pokeapi.glitch.me/v1/pokemon/1

  const agregar = (item) => {
    // Incorporacion del pokemon seleccionado en la lista 3
    setListaTres((listaTres) => [...listaTres, item]);

    // Busqueda del pokemon en listado 2 de filtro (Auxiliar)

    // Eliminacion y actualizacion del pokemon en listado 2 de filtro  (Auxiliar)
    let result = listaAux.filter((itemAux) => itemAux.name != item.name);
    setListaAux(result);

    // Eliminacion y actualizacion del pokemon en listado 1 (Original)
    /*let result2 = listado.filter((itemAux) => itemAux.name != item.name);
    setListado(result2); */
  };

  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 2 }}
        style={{
          backgroundColor: "#4F4567",
          borderRadius: "25px",
          padding: "10px",
        }}
      >
        {/* Buscador de pokemon */}
        <Grid item xs={15}>
          <TextField
            label="Buscar Pokémon"
            type="text"
            variant="outlined"
            value={buscador}
            onChange={handleInputChange}
          />
        </Grid>

        {/* Listado 1 (Original) */}
        <Grid
          item
          md={4}
          xs={4}
          style={{ backgroundColor: "#4F4557", color: "white" }}
        >
          <List>
            {listado.map((item, index) => (
              <ListItem
                key={index}
                style={{ backgroundColor: "#4F4557", color: "white" }}
              >
                {index + 1}
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                  alt="pokemon"
                />
                {item.name}
              </ListItem>
            ))}
          </List>
        </Grid>
        {/* Listado 2 (Filtrada) */}
        <Grid
          item
          md={4}
          xs={4}
          style={{ backgroundColor: "#6D5D6E", color: "white" }}
        >
          <List>
            {
              listaAux.map((item, index) => (
                <ListItem key={index}>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                      listado.findIndex(
                        (pokemon) => pokemon.name === item.name
                      ) + 1
                    }.png`  }
                    alt="pokemon"
                  />

                  {item.name}
                  <Button
                    size="small"
                    variant="contained"
                    style={{ marginLeft: "10px" }}
                    onClick={() => agregar(item)}
                  >
                    Agregar
                  </Button>
                </ListItem>
              )) // parentesis x2
            }
          </List>
        </Grid>
        {/* Listado 3 (Seleccionados) */}
        <Grid
          item
          md={4}
          xs={4}
          style={{ backgroundColor: "#4F4557", color: "white" }}
        >
          <Card>
            {listaTres.map((item, index) => (
              <div key={index}>
                <CardMedia
                  component="img"
                  maxWidth="1"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    listado.findIndex((pokemon) => pokemon.name === item.name) +
                    1
                  }.png`}
                />
                <CardContent>
                  <div>
                    Número:{" "}
                    {listado.findIndex(
                      (pokemon) => pokemon.name === item.name
                    ) + 1}
                  </div>
                  <div>Nombre: {item.name}</div>
                </CardContent>
              </div>
            ))}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
