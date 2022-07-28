import { Matriz } from './../logica/matriz';
import { Component, OnInit } from '@angular/core';
import { Tile } from '../models/tile';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  AnimationBuilder,
  AnimationPlayer
} from '@angular/animations';
@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css'],
  
})
export class SudokuComponent implements OnInit {
  tiles: Tile[] = []
  valores: Tile[] = []
  posicionSeleccionada: number = 0
  colorSeleccionada: string = "rgb(150, 150, 250)"
  sudoku: Matriz
  private player: AnimationPlayer;

  constructor(private _builder: AnimationBuilder) {
    console.log('***INICIO***');
    this.sudoku = new Matriz
    
    var time = new Date();
console.log(
  time.toLocaleString('en-US', { minute: 'numeric',second: 'numeric', hour12: true })
);
   //this.sudoku.getRandom()
   this.getSudoku()
    var time = new Date();
console.log(
  time.toLocaleString('en-US', { minute: 'numeric', second: 'numeric', hour12: true })
);
   
   }
   getSudoku(){
    var fallos = 0
    var aciertos = 0
    
    for(let i=0;i<100;i++){
      this.sudoku = new Matriz
    this.sudoku.getRandom()
      
      var elementoErroneo = this.sudoku.casillas.find((elemento)=>elemento.posibilidades.length==0)
      if(elementoErroneo!=null){
      fallos++
      }else{
        aciertos++
      }
    }
      console.log("En 100 intentos numero de aciertos: "+aciertos+" numero de fallos: "+fallos)
    
   }
  ngOnInit(): void {
    this.loadTiles()
    this.loadValues()
    }
  loadValues(){
    for (let i=0;i<9;i++){
      var tile: Tile = {text: (i+1).toString(), color: 'white', posicion: (i), seleccionada : false}
      this.valores[i]= tile
    }
  }
  loadTiles(){
    for (let i=0;i<9;i++){
      for(let j=0;j<9;j++){ 
         var tile: Tile = {text: 
           this.sudoku.casillas[i+j*9].toString()
          ,  color: 'lightblue', posicion: (i+j*9), seleccionada : false}
         
         let color : string = "rgb("
         if(i<3){
          color = color+"150, " 
         }else if(i>=3&&i<6){
          color = color + "200, "
         }else{
          color = color + "250, "
         }
         if(j<3){
          color = color+"150, " 
         }else if(j>=3&&j<6){
          color = color + "200, "
         }else{
          color = color + "250, "
         }
         if(i>=6&&j>=6){
          color = color + "200)"
         }else{
          color = color + "250)"
         }
         tile.color = this.sudoku.casillas[i+j*9].posibilidades[0]<10?color:'red'
        this.tiles[i+j*9]=tile
        }
  }
}
  selectTile(tile : Tile){
    this.makeAnimation(this.posicionSeleccionada, false)
    this.tiles[this.posicionSeleccionada].seleccionada = false
    this.colorSeleccionada = tile.color
    this.makeAnimation(tile.posicion, false)
    this.posicionSeleccionada = tile.posicion
    
    tile.seleccionada = true
  }
  selectValue(tile: Tile){
    
    this.tiles[this.posicionSeleccionada].text = tile.text
    this.makeAnimation(this.posicionSeleccionada,true)
  }
  makeAnimation(posicion: number, cambioValor: boolean) {
    
    const color = this.tiles[posicion].color
    var myAnimation
    if(cambioValor){
      myAnimation = this._builder.build([
      
        style({ outline: '2px solid black' }),
        animate(1000, keyframes ( [style({ outline : '1rem solid black'}),
        style({ outline: '0px solid black' })]))
      ]);
    }else{
    if(this.posicionSeleccionada==posicion){
    myAnimation = this._builder.build([
      
      style({ backgroundColor: 'white' }),
      animate(1000, style({ backgroundColor: this.colorSeleccionada}))
    ]);}
    else{
      myAnimation = this._builder.build([
      
        style({ backgroundColor: this.colorSeleccionada}),
        animate(1000,style({ backgroundColor: 'white' }))
      ]);}
    }
    const element = document.getElementById(posicion.toString())
    this.player = myAnimation.create(element);

    this.player.play();
  }
}
