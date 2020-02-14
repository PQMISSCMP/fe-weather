import React, { Component } from 'react';
import './App.css';
import { render } from '@testing-library/react';
import Map from "./map";

class App extends Component {
  render() {
    return (
      <div>
        <Map
          googleMapURL= {'https://maps.googleapis.com/maps/api/js?key=AIzaSyDo2qy2mXS3GVnsczDX_ZAzRlZJnGK1Kzc'}
          containerElement= {<div style={{height: '700px'}} />}
          mapElement= {<div style={{height: '100%'}} />}
          loadingElement= {<p>Cargando...</p>}
        />

      </div>
    );


  }


  
}

render (<App/>, document.getElementById('root'));

export default App;




