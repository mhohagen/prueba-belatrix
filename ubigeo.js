/* Arreglos por llenar */
const departamento_arr = [];
const provincia_arr = [];
const distrito_arr = [];

/* Mi base de datos */
const db = `“01 Lima /  / ”
“01 Lima / 50 Lima / ”
“01 Lima / 51 Barranca / ”
“01 Lima / 50 Lima / 202 La Molina”
“01 Lima / 50 Lima / 203 San Isidro”
“02 Arequipa /  / ”
“02 Arequipa / 63 Arequipa / ”
“02 Arequipa / 64 Caylloma / ”
“02 Arequipa / 63 Arequipa / 267 Cercado”`;

/* Convierto la base de datos en un arreglo */
const db_arr = db.split('\n');

for (const ubigeo of db_arr) {
  /* Limpio la base de datos y divido en las 3 infromaciones que conforman el ubigeo */
  const ubigeo_arr = ubigeo.slice(1, ( ubigeo.length - 1 ) ).split(' / ');  
  
  /* Si no he llenado anteriormente el departamento, lo agrego al arreglo */
  if (departamento_arr.filter( elem => elem.codigo === ubigeo_arr[0].split(' ')[0] ).length === 0) {
    departamento_arr.push({
      codigo: ubigeo_arr[0].substr(0, ubigeo_arr[0].indexOf(' ')),
      nombre: ubigeo_arr[0].substr(ubigeo_arr[0].indexOf(' ') + 1 ),
      codigo_padre: '-',
      descripcion_padre: '-',
    });
  }
  
  /* Si no he llenado anteriormente la provincia (y si existe), la agrego al arreglo */
  if (ubigeo_arr[1] !== '' && provincia_arr.filter( elem => elem.codigo === ubigeo_arr[1].split(' ')[0] ).length === 0 ) {
    provincia_arr.push({
      codigo: ubigeo_arr[1].substr(0, ubigeo_arr[1].indexOf(' ')),
      nombre: ubigeo_arr[1].substr(ubigeo_arr[1].indexOf(' ') + 1 ),
      codigo_padre: ubigeo_arr[0].substr(0, ubigeo_arr[0].indexOf(' ')),
      descripcion_padre: ubigeo_arr[0].substr(ubigeo_arr[0].indexOf(' ') + 1 )
    });
  }
  
  /* Si no he llenado anteriormente el distrito (y si existe), lo agrego al arreglo */
  if (ubigeo_arr[2] !== '' && distrito_arr.filter( elem => elem.codigo === ubigeo_arr[2].split(' ')[0] ).length === 0 ) {
    distrito_arr.push({
      codigo: ubigeo_arr[2].substr(0, ubigeo_arr[2].indexOf(' ')),
      nombre: ubigeo_arr[2].substr(ubigeo_arr[2].indexOf(' ') + 1 ),
      codigo_padre: ubigeo_arr[1].substr(0, ubigeo_arr[1].indexOf(' ')),
      descripcion_padre: ubigeo_arr[1].substr(ubigeo_arr[1].indexOf(' ') + 1 )
    });
  }  
}

/* Muestro la data obtenida */
console.log('Departamento', departamento_arr);
console.log('Provincia', provincia_arr);
console.log('Distrito', distrito_arr);