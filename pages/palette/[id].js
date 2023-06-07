
import { readFile, readdir } from "fs/promises";
import { basename } from "path";


function Pallete({ palette }) {


  return (
    <div>
      <h1>Soy Pallete</h1>
      {palette && (
        <div>
          <h2>{palette.paletteName}</h2>
          <span>{palette.emoji}</span>
          <ul>
        {
                  palette.colors.map(color => (
                    <li key={color.name}>
                      code: {color.color}
                    </li>
                  ))
                }
          </ul>
        
        </div>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const files = await readdir("./colors");
  const paths = files.map((file) => {
    const id = basename(file, ".json");
    return { params: { id } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const content = await readFile(`./colors/${id}.json`, "utf8");
  const palette = JSON.parse(content);
  console.log(palette)

  
  return {
    props: {
      palette,
    },
  };
}
export default Pallete;
