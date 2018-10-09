export const mapearLibroDeApi = (resultado) => {
            var librosBuscados=[];
          for(let item of resultado) {
            var thumbnail = typeof(item.imageLinks) !== 'undefined' ? item.imageLinks.thumbnail : ''
            librosBuscados.push({
              id: item.id,
              grupo: item.shelf,
              titulo: item.title,
              autor: item.authors,
              imagenURL: thumbnail,
            })
          }
	return librosBuscados;
}