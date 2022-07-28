import { ConjuntoReglas } from './conjuntoReglas';
import { Casilla } from './casilla';
export class Matriz {
  casillas: Casilla[] = [];
  solucionable: boolean
  constructor() {
    for (let i = 0; i < 81; i++) {
      this.casillas[this.casillas.length] = new Casilla(i);
    }
  }
  getRandom() {
   // console.log("***Se comienza a general el sudoku aleatorio***")
    this.solucionable=true 
    for (let i = 0; i < 81; i++) {
      let casilla = this.casillas[i];
      //console.log("PUNTERO EN CASILLA "+i)
      if (casilla.solucion == null) {
        casilla.fijarValorRandom();

        this.comprobarMatriz(casilla);
      }
    }
    if(!this.solucionable){
        this.reset()
       
        this.getRandom()
    }
  }
  reset(){
    for (let i=0;i<81;i++){
        this.casillas[i].reset()
    }
  }
  comprobarMatriz(casillaPuntero: Casilla) {
    var hayCambios = false;
    for (let i = casillaPuntero.posicion+1; i < 81; i++) {
      let casilla = this.casillas[i];
      if (casilla.solucion == null) {
        var fila = casilla.fila
        var columna = casilla.columna
        var seccion = casilla.seccion
        if (
          fila == casillaPuntero.fila ||
          columna == casillaPuntero.columna ||
          seccion == casillaPuntero.seccion
        ) {
          if (this.eliminarValorCasilla(casilla, casillaPuntero.solucion)) {
          //  console.log("Eliminado valor "+casillaPuntero.solucion+" de la casila "+casilla.posicion+" por fijado aleatorio de la posicion "+casillaPuntero.posicion)
            hayCambios = true;
          }
        }
        var posibilidades = casilla.posibilidades
        if(posibilidades.length==0){
          //  console.log("La casilla "+casilla.posicion+ " se ha quedado sin soluciones posibles")
          //this.solucionable = false
        }
        if(posibilidades.length>1&&posibilidades.length<5){
          
            if(this.crearReglasAvanzadas(casillaPuntero,casilla)){
                hayCambios = true;
            }
        }
        if (posibilidades.length == 1) {
          if (this.fijarSolucion(casillaPuntero, casilla, posibilidades[0])) {
            hayCambios = true;
          }
        }
      }
    }
    if (hayCambios) {
      this.comprobarMatriz(casillaPuntero);
    }
  }
  

  fijarSolucion(casillaPuntero: Casilla, casillaFijada: Casilla,valor:number) {
    var hayCambios = false;
    casillaFijada.fijarValor(valor);
    for (let i = casillaPuntero.posicion + 1; i < 81; i++) {
      if (i != casillaFijada.posicion) {
        let casilla = this.casillas[i];
        if (casilla.solucion == null) {
          if (
            casillaFijada.fila == casilla.fila ||
            casillaFijada.columna == casilla.columna ||
            casillaFijada.seccion == casilla.seccion
          ) {
            if (this.eliminarValorCasilla(casilla, valor)) {
               // console.log("Eliminado valor "+valor+" de la casila "+casilla.posicion+" por fijado por descarte de la posicion "+casillaFijada.posicion)
              hayCambios = true;
            }
          }
        }
      }
    }
    return hayCambios;
  }
  crearReglasAvanzadas(casillaPuntero: Casilla,casillaRegla: Casilla){
    var hayCambios = false
    var conjuntoReglas = new ConjuntoReglas(casillaRegla)
    for (let i = casillaPuntero.posicion + 1; i < 81; i++) {
      let casilla = this.casillas[i];
          if (casilla.solucion == null) {
           
        if (i != casillaRegla.posicion) {
          
            conjuntoReglas.agregarCasilla(casilla)
          }
        }
      }
    return this.aplicarReglasAvanzadas(casillaPuntero,conjuntoReglas)||hayCambios
  }
  aplicarReglasAvanzadas(casillaPuntero:Casilla,conjuntoReglas:ConjuntoReglas){
    var hayCambios = false
    var valores = conjuntoReglas.valoresTotales
    for(let i=0;i<valores.length;i++){
        var valor = valores[i]
        for(let j=casillaPuntero.posicion+1;j<81;j++){
            var casilla = this.casillas[j]
            if(casilla.solucion==null){
              
                if(conjuntoReglas.valorEliminable(casilla,valor)){
                    if (this.eliminarValorCasilla(casilla, valor)) {
                     
                     // console.log("Eliminado valor "+valor+" por reglas de grupos de la posicion "+casilla.posicion)
                        hayCambios = true;
                      }
                }
            }
        }
    }
    return hayCambios
  }
  //Si el valor existia, se devuelve true
  eliminarValorCasilla(casilla: Casilla, valor: number) {
    if (casilla.eliminarValor(valor)) {
      return true;
    } else {
      return false;
    }
  }
  
  
}
