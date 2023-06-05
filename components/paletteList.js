
function PaletteList({ colors }) {
    return (
        <ul>
          {colors.map((color) => (
            <li key={color.id}>{color.paletteName}</li>
          ))}
        </ul>
      );
  }
  

  export default PaletteList;
  