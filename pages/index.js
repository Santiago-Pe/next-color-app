/*---------- Dependecies ----------*/
import fs from "fs";
import Link from "next/link";

/*---------- Component ----------*/
function Home({ palletes }) {
  /*---------- Render ----------*/
  return (
    <ul>
      {palletes.map((palette) => (
        <li key={palette.id}>
          <Link href={`/palette/${palette.id}`}>{palette.paletteName}</Link>
        </li>
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
  const palletes = await Promise.all(promiseReadColors);

  // Imprimir información completa de los colores
  console.log(JSON.stringify(palletes, null, 2));
  return { props: { palletes } };
}

export default Home;
