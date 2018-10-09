import React from 'react';
import Menucito from './Menucito'

class GrupoLibros extends React.Component{
  cambioDeGrupo = (libroId, aGrupo) => {
      this.props.libroCambiaDeGrupo(libroId, aGrupo)
      //console.log('evento=' + event.target.value)
  }

    render(){
        const miLista = this.props.Libros.filter(libro => libro.grupo === this.props.grupoEspecifico);
        //console.log(miLista);
        //console.log('gruposLista=' + this.props.grupos);
        return(
            <div className="bookshelf-books">
            <ol className="books-grid">
            {miLista.map((item) =>  
              <li key={item.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url(" + item.imagenURL + ")" }}></div>
                    <Menucito grupos={this.props.grupos} grupoEspecifico={this.props.grupoEspecifico} menuCambioDeGrupo={this.cambioDeGrupo} libroId={item.id}></Menucito>
                  </div>
                  <div className="book-title">{item.titulo}</div>
                  <div className="book-authors">{item.autor}</div>
                </div>
              </li>
              )}
            </ol>
          </div>
        )
    }
}

export default GrupoLibros