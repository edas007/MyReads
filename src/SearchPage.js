import React from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Menucito from './Menucito'

class SearchPage extends React.Component{
constructor() {
  super();
  this.state={
    resultadoBusqueda:[],
  }

}

    componentDidMount(){
      //var abc = search("cap");
      this.setState({
        resultadoBusqueda: [],
      })
      //console.log('result=' + abc);
    }

    textoCambiado = (evento) => {
//      console.log('evento=' + evento);

      BooksAPI.search(evento)
      .then((resultado) => {
          if(resultado === undefined) 
          {
            console.log('error');

            this.setState(() => ({
              resultadoBusqueda: [],
            }))
              return;
          }
          console.log('typeof=' + typeof(resultado));
          console.log('typeof[0]=' + typeof(resultado[0]));
          if(typeof(resultado[0]) === 'undefined') 
          {
            console.log('undefined');

            this.setState(() => ({
              resultadoBusqueda: [],
            }))
              return;
          }

          var librosBuscados=[];
          for(let item of resultado) {
            var grupoDeLibro = 'none';
            var matches = this.props.Libros.filter(lib => lib.id === item.id);
            grupoDeLibro = matches.length > 0 ? matches[0].grupo : 'none';
            var thumbnail = typeof(item.imageLinks) !== 'undefined' ? item.imageLinks.thumbnail : ''
            librosBuscados.push({
              id: item.id,
              grupo: grupoDeLibro,
              titulo: item.title,
              autor: item.authors,
              imagenURL: thumbnail,
            })
          }

          this.setState(() => ({
            resultadoBusqueda: librosBuscados,
          }))

      });
      console.log('resultadoBusqueda=' + this.state.resultadoBusqueda);
    }

    cambioDeGrupo = (libroId, aGrupo) => {
      var libroElegido = this.state.resultadoBusqueda.filter(item => item.id === libroId)

      var libro = {
        id: libroId,
        grupo: aGrupo,
        titulo: libroElegido[0].titulo,
        autor: libroElegido[0].autor,
        imagenURL: libroElegido[0].imagenURL
      }

      this.props.libroAgregaAGrupo(libro)
      //console.log('evento=' + event.target.value)
    }

    render(){
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={(evento) => this.textoCambiado(evento.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {this.state.resultadoBusqueda !== undefined && this.state.resultadoBusqueda.map((item) => (
                  <li key={item.id}>
                      <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url(" + item.imagenURL + ")" }}></div>
                        <Menucito grupos={this.props.grupos} grupoEspecifico={item.grupo} menuCambioDeGrupo={this.cambioDeGrupo} libroId={item.id}></Menucito>
                      </div>
                      <div className="book-title">{item.titulo}</div>
                      <div className="book-authors">{item.autor}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )
    }

}

export default SearchPage