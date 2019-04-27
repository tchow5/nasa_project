import React, {Component} from 'react';
import './App.css';

import axios from 'axios';
import Calendar from 'react-calendar';


//var link = 'https://apod.nasa.gov/apod/image/1904/M81salvatore1024.jpg';
var nasaKey = 'RqKH1d6LQYKMH2YxL5968aG7TfsQBXBdl2m6eOdC';

class App extends Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      date: new Date(),
      link: null,
      description: null
    }

    
    this.getMonthFromString = this.getMonthFromString.bind(this);
    this.pad = this.pad.bind(this);
    this.formatDate = this.formatDate.bind(this);
  
  }
  
  getMonthFromString = mon => {
    return new Date(Date.parse(mon +" 1, 2012")).getMonth()+1
  }

   pad = (num, size) => {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  formatDate = date => {

    // var info = date.split(' ');
    // var month = this.getMonthFromString(info[1])
    // var stringMonth = this.pad(month, 2);
    // var stringDate = info[2];
    // var stringYear = info[3];
    // var apiDate = stringYear + '-' + stringMonth + '-' + stringDate

    var apiDate = date.getFullYear() + '-' + (date.getMonth() +1)+ '-' + date.getDate()

    return apiDate;

  }

  componentDidMount(){
    
    this.getURI(this.state.date);
    this.forceUpdate();
  }

  getURI = date =>{
    axios.get('https://api.nasa.gov/planetary/apod?api_key=' + nasaKey + '&date=' + this.formatDate(date))
                            .then( res => {
                              const imageData = res.data;
                              
                              console.log(imageData)

                              if (imageData.media_type ==='image'){
                                this.setState({ link: imageData.url});
                                this.setState({ description: imageData.explanation})
                                console.log(this.state.link + "  url: " + imageData.url);

                              } else {
                                this.setState({ link: 'https://apod.nasa.gov/apod/image/1904/M81salvatore1024.jpg'});
                                this.setState({ description: "Tracking along the southern Milky Way this beautif…ears from Earth along the plane of the Milky Way."});
                              }

                            })

  }

  onChange = date =>{ this.getURI(date)
                      this.setState({ date })
                  }

  onClickMonth = (value) => alert('Clicked month: ', value)
  

 
  render() {
    return (
      console.log("im here in render"),
      console.log(this.state.link),
      <div>
        <Calendar
          onChange={this.onChange}
          onClickMonth={this.onClickMonth}
          value={this.state.date}
        />
        <h4>Image:</h4>
        {this.state.link ? (
          <img src = {this.state.link} alt="new" />
        ) : null }
        <h4>Description:</h4>
        <p1>{this.state.description}</p1>
      </div>
    );
  }
}

export default App;
