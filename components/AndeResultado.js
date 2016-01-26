import React from 'react';

export default class AndeResultado extends React.Component {
  render() {
    if (this.props.htmlResponse!==''){
      return <div className="andefiltrar">
        <p>{this.props.htmlResponse}</p>
      </div>
    } else {
      return <div className="andefiltrar">
        <p>Sin resultados.</p>
      </div>
    }

  }
}
