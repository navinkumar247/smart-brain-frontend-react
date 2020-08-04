import React, {Component} from 'react';

import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';



const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: { 
        enable : true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {}, 
  route: '',
  isSignedIn: false,
  user: {
    id: '',
    email: '',
    name: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor () {
    super ();
    this.state = initialState;
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return  {
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row*height,
      rightCol: width - clarifaiFace.right_col*width,
      bottomRow: height - clarifaiFace.bottom_row*height
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('http://127.0.0.1:3000/image', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
          input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(error => console.log(error));

    fetch('http://127.0.0.1:3000/image', {
      method: 'put',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
          id: this.state.user.id
      })
    })
    .then(response => response.json())
    .then(data => this.setState( 
      {user: data[0]}
    ))
    .catch(error => console.log(error))
  }
  
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      email: data.email,
      name: data.name,
      entries: data.entries,
      joined: data.entries
    }})
  }
  onRouteChange = (route) => {
    if (route === 'home' ){
      this.setState({isSignedIn: true});
    } else {
      this.setState(initialState);
    }
    this.setState({route: route})
  }

  // async componentDidMount() {
  //   const response = await fetch('http://127.0.0.1:3000');
  //   const data = await response.json();
  // }
  
  render() {
    const {isSignedIn, box, imageUrl, route, user} = this.state;
    return (
      <div className="App">
        <Particles className = 'particles'
          params={particlesOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange}/>
        { route === 'home'
        ? <div> 
            <Logo /> 
              <Rank  user ={user}/>
              <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit} 
              />        
              <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
        : (
          route === 'signin'
          ? <Signin loadUser= {this.loadUser} onRouteChange = {this.onRouteChange}/>
          : <Register onRouteChange = {this.onRouteChange}/>
        )
           }
      </div>
    );
  }
}

export default App;
