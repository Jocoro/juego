
import { Casilla } from "./casilla"
export class ConjuntoReglas{
    casillaInicial: Casilla
    valores: number[]=[]
    valoresCadenaFila: number[]=[]
    valoresCadenaColumna: number[]=[]
    valoresCadenaSeccion: number[]=[]
    valoresTrioFila: number[]=[]
    valoresTrioColumna: number[]=[]
    valoresTrioSeccion: number[]=[]
    valoresTotales:number[]=[]
    grupoFila: Regla
    grupoColumna: Regla
    grupoSeccion: Regla
    cadenaFila: Regla
    cadenaColumna: Regla
    cadenaSeccion: Regla
    trioFila: Regla
    trioColumna: Regla
    trioSeccion: Regla
    cadenaX: Regla
    cadenaY: Regla
    constructor(casilla: Casilla){
        this.casillaInicial = casilla
        var posibilidades = casilla.posibilidades
        for(let i=0;i<posibilidades.length;i++){
            this.valores[this.valores.length] = posibilidades[i]
            this.valoresTotales[this.valoresTotales.length] = posibilidades[i]
        }
       
        this.grupoFila = new Regla(casilla)
        this.grupoColumna = new Regla(casilla)
        this.grupoSeccion = new Regla(casilla)
        this.cadenaFila = new Regla(casilla)
        this.cadenaColumna = new Regla(casilla)
        this.cadenaSeccion = new Regla(casilla)
        this.trioFila = new Regla(casilla)
        this.trioColumna = new Regla(casilla)
        this.trioSeccion = new Regla(casilla)
        this.cadenaX = new Regla(casilla)
        this.cadenaY = new Regla(casilla)
        
    }
    agregarCasilla(casilla:Casilla){
        var posibilidades = casilla.posibilidades
        if(casilla.mismosValores(this.casillaInicial)){
            if(casilla.fila==this.casillaInicial.fila){
                this.grupoFila.agregarCasilla(casilla)
                
                if(this.cadenaX.casillas.length==1){
                this.cadenaX.agregarCasilla(casilla)
                }
                
            }
            if(casilla.columna==this.casillaInicial.columna){
                this.grupoColumna.agregarCasilla(casilla)
                if(this.cadenaX.casillas.length==2){
                    this.cadenaX.agregarCasilla(casilla)
                    }
            }
            if(casilla.seccion==this.casillaInicial.seccion){
                this.grupoSeccion.agregarCasilla(casilla)
            }
        }else if(casilla.mismaCadena(this.casillaInicial)){
            if(casilla.fila==this.casillaInicial.fila){
                this.cadenaFila.agregarCasilla(casilla)
                this.valoresCadenaFila=this.cadenaFila.valores
                this.aumentarValoresTotales(posibilidades)
                if(this.cadenaX.casillas.length==1){
                    this.cadenaX.agregarCasilla(casilla)
                    }
                    if(this.cadenaY.casillas.length==1){
                this.cadenaY.agregarCasilla(casilla)
                    }
            }
            if(casilla.columna==this.casillaInicial.columna){
                this.cadenaColumna.agregarCasilla(casilla)
                this.valoresCadenaColumna=this.cadenaColumna.valores
                this.aumentarValoresTotales(posibilidades)
                if(this.cadenaX.casillas.length==2){
                    this.cadenaX.agregarCasilla(casilla)
                    }
                    if(this.cadenaY.casillas.length==1){
                        this.cadenaY.agregarCasilla(casilla)
                            }
            }
            if(casilla.seccion==this.casillaInicial.seccion){
                this.cadenaSeccion.agregarCasilla(casilla)
                this.valoresCadenaSeccion=this.cadenaSeccion.valores
                this.aumentarValoresTotales(posibilidades)
            }

        }else if(casilla.mismoTrio(this.casillaInicial)){
            if(casilla.fila==this.casillaInicial.fila){
                this.trioFila.agregarCasilla(casilla)
                this.valoresTrioFila=this.trioFila.valores
                this.aumentarValoresTotales(posibilidades)
            }
            if(casilla.columna==this.casillaInicial.columna){
                this.trioColumna.agregarCasilla(casilla)
                this.valoresTrioColumna=this.trioColumna.valores
                this.aumentarValoresTotales(posibilidades)
            }
            if(casilla.seccion==this.casillaInicial.seccion){
                this.cadenaSeccion.agregarCasilla(casilla)
                this.valoresTrioSeccion=this.trioSeccion.valores
                this.aumentarValoresTotales(posibilidades)
            }
        }
        else if(this.cadenaX.casillas.length==3&&this.cadenaX.casillas[1].columna==casilla.columna&&this.cadenaX.casillas[2].fila==casilla.fila&&casilla.mismaCadena(this.casillaInicial)){
            this.cadenaX.agregarCasilla(casilla)
        }else if(this.cadenaY.casillas.length==2&&this.cadenaY.casillas[1].columna==casilla.columna&&casilla.mismaCadena(this.casillaInicial)){
            this.cadenaY.agregarCasilla(casilla)
        }
        
    }
    aumentarValoresTotales(posibilidades:number[]){
        for(let i=0;i<this.valoresTotales.length;i++){
            var valor = posibilidades[i]
            if(!this.valoresTotales.includes(posibilidades[i])){
                this.valoresTotales[this.valoresTotales.length]=valor
            }
        }
    }
    valorEliminable(casilla:Casilla,valor:number){
        if(this.grupoFila.confirmarReglaVolumen()&&!this.grupoFila.contiene(casilla)&&casilla.fila==this.casillaInicial.fila&&this.valores.includes(valor)){
            return true
        }else if (this.grupoColumna.confirmarReglaVolumen()&&!this.grupoColumna.contiene(casilla)&&casilla.columna==this.casillaInicial.columna&&this.valores.includes(valor)){
            return true
        }else if (this.grupoSeccion.confirmarReglaVolumen()&&!this.grupoSeccion.contiene(casilla)&&casilla.seccion==this.casillaInicial.seccion&&this.valores.includes(valor)){
            return true
        }else if(this.cadenaFila.confirmarReglaVolumen()&&!this.cadenaFila.contiene(casilla)&&casilla.fila==this.casillaInicial.fila&&this.valoresCadenaFila.includes(valor)){
            return true
        }else if (this.cadenaColumna.confirmarReglaVolumen()&&!this.cadenaColumna.contiene(casilla)&&casilla.columna==this.casillaInicial.columna&&this.valoresCadenaColumna.includes(valor)){
            return true
        }else if (this.cadenaSeccion.confirmarReglaVolumen()&&!this.cadenaSeccion.contiene(casilla)&&casilla.seccion==this.casillaInicial.seccion&&this.valoresCadenaSeccion.includes(valor)){
            return true
        }else if(this.trioFila.confirmarReglaVolumen()&&!this.trioFila.contiene(casilla)&&casilla.fila==this.casillaInicial.fila&&this.valoresTrioFila.includes(valor)){
            return true
        }else if (this.trioColumna.confirmarReglaVolumen()&&!this.trioColumna.contiene(casilla)&&casilla.columna==this.casillaInicial.columna&&this.valoresTrioColumna.includes(valor)){
            return true
        }else if (this.trioSeccion.confirmarReglaVolumen()&&!this.trioSeccion.contiene(casilla)&&casilla.seccion==this.casillaInicial.seccion&&this.valoresTrioSeccion.includes(valor)){
            return true
        }else if(this.cadenaY.confirmarReglaCadenaY(valor)&&!this.cadenaY.contiene(casilla)&&casilla.columna==this.cadenaY.casillas[1].columna&&casilla.fila==this.cadenaY.casillas[2].fila){
           // console.log("CadenaY formada por "+this.cadenaY.casillas[0].posicion+this.cadenaY.casillas[1].posicion+this.cadenaY.casillas[2].posicion+" Eliminado valor "+valor+" de la posicion "+casilla.posicion)
            return true
        }else if(this.cadenaX.confirmarReglaCadenaX(valor)&&!this.cadenaX.contiene(casilla)){
            var algunaFila = casilla.fila==this.cadenaX.casillas[0].fila||casilla.fila==this.cadenaX.casillas[2].fila
            var algunaColumna= casilla.fila==this.cadenaX.casillas[0].fila||casilla.fila==this.cadenaX.casillas[2].fila
            if( algunaFila||algunaColumna){
            //console.log("CadenaX formada por "+this.cadenaX.casillas[0].posicion+this.cadenaX.casillas[1].posicion+this.cadenaX.casillas[2].posicion+this.cadenaX.casillas[3].posicion+" Eliminado valor "+valor+" de la posicion "+casilla.posicion)
            return true
            }
        }    
         return false   
    
        }
    
   
    
}
export class Regla{
    casillas: Casilla[]=[]
    valores: number[]=[]
    constructor(casilla:Casilla){
        this.casillas[this.casillas.length]=casilla
        
        var posibilidades =casilla.posibilidades
        for(let i=0;i<posibilidades.length;i++){
            this.valores[i]=posibilidades[i]
        }
    }
    agregarCasilla(casilla:Casilla){
      
        this.casillas[this.casillas.length]=casilla
        var posibilidades = casilla.posibilidades
        for(let i=0;i<posibilidades.length;i++){
            var valor = posibilidades[i]
            if(!this.valores.includes(posibilidades[i])){
                this.valores[this.valores.length]=valor
            }
        }
       
    }
    confirmarReglaVolumen(){
        return this.casillas.length==this.valores.length

    }
    confirmarReglaCadenaX(valor:number){
        if(this.casillas.length==4&&this.valores.length==3){
            
            return this.casillas[2].posibilidades.includes(valor)&&this.casillas[3].posibilidades.includes(valor)
        }else{
            return false
        }
    }
    confirmarReglaCadenaY(valor:number){
        if(this.casillas.length==3&&this.valores.length==3){
            return this.casillas[1].posibilidades.includes(valor)&&this.casillas[2].posibilidades.includes(valor)
        }else{
            return false
        }
    }
    contiene(casilla:Casilla){
        for(let i=0;i<this.casillas.length;i++){
            if(casilla.posicion==this.casillas[i].posicion){
                return true
            }
        }
        return false
    }
}

