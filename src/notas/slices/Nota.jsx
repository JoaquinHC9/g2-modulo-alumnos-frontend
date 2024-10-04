//Nota.jsx
class Nota {
    constructor(id, padreId, nombreComponente, nota, calculado) {
      this.id = id; // El ID único de la nota
      this.padreId = padreId; // ID del padre
      this.nombreComponente = nombreComponente;
      this.nota = nota;
      this.calculado = calculado;
      this.children = []; // Array que almacenará las notas hijas
    }
  
    // Método para agregar un hijo
    agregarHijo(nota) {
      this.children.push(nota);
    }
  }
  export default Nota;