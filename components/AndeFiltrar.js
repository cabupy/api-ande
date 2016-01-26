import React from 'react';

export default class AndeFiltrar extends React.Component {
  onClick(ev) {
    let valorNis = React.findDOMNode( this.refs.inputNis ).value
    this.props.onConsulta( valorNis )
  }
  onKeyPress(ev){
    if(ev.keyCode == 13){
      this.onClick.bind(this)
    }
  }
  componentWillMount() {
     console.log('Se va a montar ', Date.now())
  }
  componentDidMount() {
     console.log('Se monto ', Date.now())
  }
  render() {
    return <div className="input-group">
      <input type="number" ref="inputNis" className="form-control" placeholder="Ingrese el numero de NIS ..." autofocus></input>
      <span className="input-group-btn">
        <button className="btn btn-default" type="button" onClick={this.onClick.bind(this)} onKeyPress={this.onKeyPress.bind(this)}>Buscar</button>
      </span>
    </div>
  }
}
