import React from 'react';

class Menucito extends React.Component{
    state={
        cambiadoAGrupoId:'',
    }

    manejarCambioDeGrupo = (evento) => {
        //console.log('option=' + evento.target.value)
        this.props.menuCambioDeGrupo(this.props.libroId, evento.target.value)
    }

    render(){
        //const gruposLista = this.props.grupos;
        //console.log('gruposLista=' + gruposLista);
        //console.log('this.props.grupoEspecifico=' + this.props.grupoEspecifico);
        return(
            <div className="book-shelf-changer">
            <select value={this.props.grupoEspecifico} onChange={this.manejarCambioDeGrupo}>
              <option value="move" disabled>Move to...</option>
              {this.props.grupos.map((item)=>(
                    <option key={item.id} value={item.id} >
                    {item.etiqueta}
                    </option>
              ))}
            </select>
          </div>

        )
    }
}

export default Menucito