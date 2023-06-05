function Pagina({ datos }) {
  return (
    <div>
      {datos.map(dato => (
        <div key={dato.id}>{dato.nombre}</div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch('/datos.json');
  const data = await res.json();
  return {
    props: {
      datos: data.datos,
    },
  };
}

export default Pagina;
