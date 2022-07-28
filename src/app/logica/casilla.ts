export class Casilla{
    posibilidades: number[]= [1,2,3,4,5,6,7,8,9]
    posicion: number
    solucion: number
    fila: number
    columna: number
    seccion: number
    constructor(posicion: number){
        this.posicion = posicion
        this.fila = Math.floor(posicion/9)
        this.columna = posicion%9
        this.seccion = Math.floor(posicion/3)%3+ Math.floor(posicion/27)*3
    }
    fijarValorRandom(){
        let numOpciones = this.posibilidades.length
        let posicion = Math.floor(Math.random() * numOpciones)
        let valor = this.posibilidades[posicion]
        this.fijarValor(valor)
        return valor
    }
    fijarValor(valor: number){
        this.posibilidades=this.posibilidades.filter((posibilidad)=> posibilidad==valor)
        
        this.solucion=valor
        
    }
    //Devuelve true si se ha eliminado el valor
    eliminarValor(valor: number){
        let numPosibilidades = this.posibilidades.length
        this.posibilidades=this.posibilidades.filter((posibilidad)=>posibilidad!=valor)
        if(numPosibilidades!=this.posibilidades.length){
            return true
        }else{
            return false
        }
    }
    mismosValores(casilla:Casilla){
        if(this.posibilidades.length==casilla.posibilidades.length){
            for(let i=0;i<this.posibilidades.length;i++){
                if(this.posibilidades[i]!=casilla.posibilidades[i]){
                    return false
                }
            }
            return true
        }
        return false
    }
    mismaCadena(casilla: Casilla){
        var numComunes=0
        if(this.posibilidades.length==casilla.posibilidades.length){
            for(let i=0;i<this.posibilidades.length;i++){
                if(this.posibilidades.includes(casilla.posibilidades[i])){
                    numComunes++
                }
            }
            return numComunes==this.posibilidades.length-1
        }
        return false
    }
    mismoTrio(casilla:Casilla){
        if(this.posibilidades.length==3&&casilla.posibilidades.length==2){
            for(let i = 0; i<casilla.posibilidades.length;i++){
                if(!this.posibilidades.includes(casilla.posibilidades[i])){
                    return false
                }
            }
            return true
        }
        if(this.posibilidades.length==2&&casilla.posibilidades.length==3){
            for(let i = 0; i<this.posibilidades.length;i++){
                if(!casilla.posibilidades.includes(this.posibilidades[i])){
                    return false
                }
            }
            return true
        }
        return false

        
    }
    toString(){
        var text:string =""
        for(let i= 0;i <this.posibilidades.length; i++){
            if(i==3||i==6){
                text=text+"\n"
            }else if(i>0){
                text=text+" "
            }
            text =text+this.posibilidades[i]
            
        }
        
        return text
    }
    reset(){
        this.posibilidades= [1,2,3,4,5,6,7,8,9]
        this.solucion = null
    }
}