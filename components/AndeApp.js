import React from 'react';
import AndeFiltrar from './AndeFiltrar';
import AndeResultado from './AndeResultado';
import $ from 'jquery';

export default class AndeApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { htmlResponse : '', nis: 0 };
    this.onConsulta = this.onConsulta.bind(this);
  }

  limpiarData(data){
    data = data.replace(/<br\s*[\/]?>/gi,'')
    data = data.replace('<p>','')
    data = data.replace('</p>','')
    data = data.replace('<center>','')
    data = data.replace('</center>','')
    return data
  }

  onConsulta(nis) {
    if (nis==''){
      this.setState({
        htmlResponse: { html : 'Debe ingresar un numero de NIS ...' }
      });
      return;
    }
    if ( nis < 100000 || nis > 9999999 ) {
      this.setState({
        htmlResponse: { html : 'Debe ingresar un numero de NIS ...' }
      });
      return;
    }
    this.setState({
      htmlResponse: { html : 'Aguarde ...' }
    });
    //console.log('NIS: ', nis)
    $.post('/consulta', {nis:nis}, (data) => {
      data.html = this.limpiarData(data.html)
      this.setState({
        htmlResponse: data
      });
    })
    .fail(function() {
      this.setState({
        htmlResponse: { html : 'Su busqueda no arrojo resultados.' }
      });
    });
  }

  render() {
      return <div className="container" style={{marginTop:80+'px'}}>
        <AndeFiltrar nis={this.state.nis} onConsulta={ this.onConsulta } />
        <AndeResultado htmlResponse={this.state.htmlResponse} />
      </div>
  }
}
