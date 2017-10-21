import React, { Component } from 'react';
import { render } from 'react-dom';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';


export default class App extends Component {
  render() {
    return <GetIp/> 
  }
} 


class GetIp extends Component {
  constructor() {
    super();
    this.state = {
        GEO: null
    }
  }

  componentDidMount() {
    const ipURL = 'https://freegeoip.net/json/';
    fetch(ipURL)
      .then(res => res.json())
      .then(data => this.setState({GEO: data}))
  }

  render() {
    var GEO = this.state.GEO;
    return <section className="weatherApp">
            {GEO == null ? 
              `wait` :
              <WeatherCont 
                    lat={GEO['latitude']}
                    lon={GEO['longitude']}/> 
            }
    </section>
  }
}

class WeatherCont extends Component {
  constructor() {
    super();
    this.state = {
      weaData: null
    }
  }

  componentDidMount() {
    const url = 'https://fcc-weather-api.glitch.me/api/current?lat='+ this.props.lat +'&lon='+ this.props.lon; 
    fetch(url)
      .then( resp => resp.json())
      .then( data => this.setState({weaData: data}))
  }

  render() {
    const weaData = this.state.weaData;

    if(!weaData) return <div>going..</div>
    const J = JSON.stringify;
    //{JSON.stringify(weaData)}
    return  <ShowContent 
              sky={J(weaData.weather[0].description)}
              city={J(weaData.name)}
              icon={J(weaData.weather[0].icon)}
              temper={J(weaData.main.temp)}
              pressure={J(weaData.main.pressure)}
              wiind={J(weaData.wind.speed)}
              humidity={J(weaData.main.humidity)}
      />
  }
}

class ShowContent extends Component {

  render() {
    const { sky, city, icon, temper, pressure, humidity, wiind } = this.props;
    let sk   = sky.replace( /["']+/g, '' ),
        cit  = city.replace( /['"]+/g, '' ),
        ico  = icon.replace( /['"]+/g, '' ),
        wind = wiind.replace( /['"]+/g, '' ),
        temp = temper.replace( /['"]+/g, '' ),
        pres = pressure.replace( /['"]+/g, '' ),
        humi = humidity.replace( /['"]+/g, '' );
    return <article className="displaying">
              <img src={ico} alt="ico" />
              <h3> {sk} in {cit}  </h3>
              <p className="temp"><i className="fa fa-thermometer-empty" aria-hidden="true"></i> {temp}° C</p>
              <p><i className="fa fa-flag-o" aria-hidden="true"></i> {wind}m/s</p>
              <p><i className="fa fa-tint" aria-hidden="true"></i> {humi}%</p>
    </article>
  }
}


