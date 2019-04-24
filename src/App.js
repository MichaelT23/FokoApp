import React, { Component } from 'react';
import './App.css';
import images from './logos/logo.js'
import Sort from './components/Sort'
import Roster from './components/Roster'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      teamData: {},
      images,
      rosterData:{}
    }
    this.getRoster = this.getRoster.bind(this)
     this.filteredData = this.filteredData.bind(this)
     this.sorting = this.sorting.bind(this)
  }

  componentDidMount() {
   fetch(`https://statsapi.web.nhl.com/api/v1/teams`)
        .then(response => response.json())
        .then(data => {
          this.setState({
            teamData:data
          })
          var output = ''

          for (var i in this.state.teamData.teams) {
          output += `<ul><li id="teamItems" value=${this.state.teamData.teams[i].id}><img id="logo" src=${this.state.images[i].logo}/>${this.state.teamData.teams[i].name}<br /><br /><br /></li></ul>` 
        }
        document.getElementById('text').innerHTML = output
        })
        .catch(err => console.log(err))  
    }


    // Displays roster for each NHL team
    getRoster(e) {
    var value = e.target.value;
     
    fetch(`https://statsapi.web.nhl.com/api/v1/teams/${value}/roster`)
        .then(response => response.json())
        .then(data => {
          this.setState({
            rosterData:data
          })

      var rosterOutput = '';

      rosterOutput += `<h1 className="title">Roster</h1><br />
      <p><span class="roster-title">Name</span> <span class="roster-title">Position</span> <span class="roster-title">Jersey Number</span>`
    
    for (var i in this.state.rosterData.roster) {
        rosterOutput += `<ul id="name-container"><li id="openModal" class="name" value=${this.state.rosterData.roster[i].person.id}>${this.state.rosterData.roster[i].person.fullName}</li></ul>
        <span id="position">${this.state.rosterData.roster[i].position.name}</span>
        <span id="number">${this.state.rosterData.roster[i].jerseyNumber}</span></p>`;   
    }
      document.getElementById('rosterInfo').innerHTML = rosterOutput;

      }) // end of data
        .catch(err => console.log(err))
   }


      filteredData(e) {
    var rosterOutput = ''
        
        for (var i in this.state.rosterData.roster) {
       if (this.state.rosterData.roster[i].position.name == e.target.value){
       rosterOutput = this.state.rosterData.roster.filter((item) => {
           if (e.target.value == item.position.name) {
            return true
           }
            
        }); 
       
       }
     }

     for(var i = 0; i < rosterOutput.length; i++) {
      document.getElementById('rosterInfo').innerHTML = 
      `<h1 className="title">Roster</h1><br /><b />
      <p><span class="roster-title">Name</span><span class="roster-title">Position</span> <span class="roster-title">Jersey Number</span>

      <br /><ul id="name-container"><li id="openModal" class="name" value=${this.state.rosterData.roster[i].person.id}>${rosterOutput[i].person.fullName}</li></ul>
        <span id="position">${rosterOutput[i].position.name}</span>
        <span id="number">${rosterOutput[i].jerseyNumber}</span></p>`
     }




  } 

  sorting(e) {
    var rosterOutput = ''
    for (var i in this.state.rosterData.roster) {
      if(e.target.value == 'name') {
       this.state.rosterData.roster.sort((a, b) => {
           if (a.person.fullName > b.person.fullName) {
            return 1;
           } else {
            return -1;
           }
        }
      )} 
        
     }

     rosterOutput += `<h1 className="title">Roster</h1><br />
      <p><span class="roster-title">Name</span> <span class="roster-title">Position</span> <span class="roster-title">Jersey Number</span>`

    for (var i in this.state.rosterData.roster) {
      rosterOutput += `<br /><ul id="name-container"><li id="openModal" class="name" value=${this.state.rosterData.roster[i].person.id}>${this.state.rosterData.roster[i].person.fullName}</li></ul>
        <span id="position">${this.state.rosterData.roster[i].position.name}</span>
        <span id="number">${this.state.rosterData.roster[i].jerseyNumber}</span></p>`

    }

    document.getElementById('rosterInfo').innerHTML = rosterOutput

    var rosterOutput = ''
    for (var i in this.state.rosterData.roster) {
      if(e.target.value == 'jerseyNumber') {
       this.state.rosterData.roster.sort((a, b) => {
           if (a.jerseyNumber > b.jerseyNumber) {
            return 1;
           } else {
            return -1;
           }
        }
      )} 
        
     }

     rosterOutput += `<h1 className="title">Roster</h1><br />
      <p><span class="roster-title">Name</span> <span class="roster-title">Position</span> <span class="roster-title">Jersey Number</span>`

    for (var i in this.state.rosterData.roster) {
      rosterOutput += `<br /><ul id="name-container"><li id="openModal" class="name" value=${this.state.rosterData.roster[i].person.id}>${this.state.rosterData.roster[i].person.fullName}</li></ul>
        <span id="position">${this.state.rosterData.roster[i].position.name}</span>
        <span id="number">${this.state.rosterData.roster[i].jerseyNumber}</span></p>`

    }

    document.getElementById('rosterInfo').innerHTML = rosterOutput
    
    
}

    

   

  render() {
    return (
      <div className="App">
      <section className="container">
        <h1 className="title">NHL Teams</h1>
        <p id="roster-para">Click Team Name For Roster Info!</p>

        <Sort filteredData = {this.filteredData} sortingData = {this.sorting} />

        <ul id="team"><li id="text" onClick={this.getRoster}></li></ul>
         <Roster getRoster = {this.getRoster} rosterData = {this.state.rosterData} />

       
        </section>
      </div>
    );
  }
}

export default App;
