//arbolnotas.jsx
class ArbolNotas {
  constructor() {
    this.nodos = {}; // Diccionario que almacenara todas las notas (id => Nota)
    this.raices = []; // Notas que no tienen padre (padreId == null)
  }
  // Método para agregar una nota al árbol (sin asignar aún los hijos)
  agregarNota(notaData) {
    const { componentenotaid, padreId, nombreComponente, nota, calculado } = notaData;
    
    // Crear una nueva nota (nodo)
    const nuevaNota = new Nota(componentenotaid, padreId, nombreComponente, nota, calculado);

    // Almacenar la nota en el diccionario por su id
    this.nodos[componentenotaid] = nuevaNota;
  }
  // Método para construir el árbol a partir de un array de notas
  construirArbol(notas) {
    // Primero, agregar todas las notas sin preocuparse por los hijos
    notas.forEach(nota => this.agregarNota(nota));
    // Segundo, asignar los hijos correctamente
    Object.values(this.nodos).forEach(nota => {
      if (nota.padreId === null) {
        // Si la nota no tiene padre, es una raíz
        this.raices.push(nota);
      } else {
        // Si tiene padre, buscar el padre y agregarla como hijo
        const padre = this.nodos[nota.padreId];
        if (padre) {
          padre.agregarHijo(nota);
        }
      }
    });
  }
}

//Nota.jsx
class Nota {
  constructor(componentenotaid, padreId, nombreComponente, nota, calculado) {
    this.componentenotaid  = componentenotaid; // El ID único de la nota
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

export default ArbolNotas;
