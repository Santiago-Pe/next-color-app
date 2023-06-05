/*---------- Dependecies ----------*/
import fs from "fs";

/*---------- Component ----------*/
function Home({ colors }) {
  /*---------- Render ----------*/
  return (
    <ul>
      {colors.map((color) => (
        <li key={color.id}>{color.paletteName}</li>
      ))}
    </ul>
  );
}

/*---------- Server/Client Funciotns Props ----------*/
export async function getServerSideProps() {
  //  Leer los nombres de archivo en la carpetae incluir información adicional y permisos sobre cada archivo
  const colorFiles = await fs.promises.readdir("./colors", {
    withFileTypes: true,
  });

  const promiseReadColors = colorFiles
    // filtrar solo los archivos que tienen la extensión ".json"
    .filter((file) => file.isFile() && file.name.endsWith(".json"))
    // transformar cada nombre de archivo en un objeto de color.
    .map(async (file) => {
      //leer el contenido del archivo JSON como una cadena
      const content = await fs.promises.readFile(
        `./colors/${file.name}`,
        "utf8"
      );
      //convertir la cadena en un objeto JS
      return JSON.parse(content);
    });
    
  // esperar a que se resuelvan todas las promesas devueltas por las llamadas a readFile y JSON.parse
  const colors = await Promise.all(promiseReadColors);

  console.log(colors);
  return { props: { colors } };
}

export default Home;
