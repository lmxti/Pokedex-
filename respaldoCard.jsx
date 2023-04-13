<Card>
{listaTres.map((item, index) => (
  <Box key={index}>
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
  </Box>
))}
</Card>