import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import GrupoLibros from './GrupoLibros'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import * as LibroMapperAPI from './LibroMapper'

class BooksApp extends React.Component {
  constructor(){
    super();
  
  this.state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    Libros: [],
    LibroParaCambiar:'',
  }
  }

  componentDidMount(){
    this.actualizarEstado();
  }

  componentDidUpdate(){
    this.actualizarEstado();
  }
  
  actualizarEstado(){
    BooksAPI.getAll()
      .then((resultado) => {
      	//console.log('resultado='+JSON.stringify(resultado));
      	var abc = LibroMapperAPI.mapearLibroDeApi(resultado);
      	//console.log('abc' + JSON.stringify(abc));
      
        this.setState(() => ({
          Libros: abc,
        }))
      })
  }
  
  libroCambio = (libroId, aGrupo) => {
    BooksAPI.get(libroId)
      .then((resultado) => {
//      console.log('resultado0='+resultado);	
//      console.log('resultado1='+JSON.stringify(resultado));
      
            BooksAPI.update(resultado, aGrupo)
          		.then((resultado2) => {
              	//console.log('resultado2='+JSON.stringify(resultado2));
          })
      })
    }
  
  //PARA SEARCH
  anadirAGrupo = (libro) => {
    this.libroCambio(libro.id, libro.grupo);
  }
    
  render() {
    const grupos = [
      {id:'currentlyReading', etiqueta:'Currently Reading'},
      {id:'wantToRead', etiqueta:'Want to Read'},
      {id:'read', etiqueta:'Read'},
      {id:'none', etiqueta:'None'},
    ];

    return (
      <div className="app">

      <Route path='/busca' render={()=>(
        <SearchPage Libros={this.state.Libros} grupos={grupos} libroAgregaAGrupo={this.anadirAGrupo}></SearchPage>
      )}
      />

      <Route exact path='/' render={()=>(

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <GrupoLibros Libros={this.state.Libros} grupos={grupos} grupoEspecifico='currentlyReading' libroCambiaDeGrupo={this.libroCambio}></GrupoLibros>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <GrupoLibros Libros={this.state.Libros} grupos={grupos} grupoEspecifico='wantToRead' libroCambiaDeGrupo={this.libroCambio}></GrupoLibros>
                </div>

                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <GrupoLibros Libros={this.state.Libros} grupos={grupos} grupoEspecifico='read' libroCambiaDeGrupo={this.libroCambio}></GrupoLibros>
                </div>


              </div>
            </div>
            <div className="open-search">
              <Link 
                to='/busca'
              >Add a book</Link>
            </div>
          </div>
        )}
        />
  
      </div>
    )
  }
}

export default BooksApp
