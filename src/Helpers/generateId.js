function generarIdUnico() {
  // Obtiene un timestamp actual en milisegundos
  const timestamp = new Date().getTime();

  // Crea una cadena aleatoria de caracteres alfanuméricos
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const longitud = 8; // Puedes ajustar la longitud de la cadena según tus necesidades
  let cadenaAleatoria = "";
  for (let i = 0; i < longitud; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    cadenaAleatoria += caracteres.charAt(indiceAleatorio);
  }

  // Combina el timestamp y la cadena aleatoria para crear un ID único
  const idUnico = `${timestamp}-${cadenaAleatoria}`;

  return idUnico;
}

module.exports = generarIdUnico;
