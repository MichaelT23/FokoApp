import React, { Component } from 'react';


class Roster extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countryData:{}
    }

    this.getCountry = this.getCountry.bind(this)

  }

  getCountry(e) {

 var countryID = e.target.value;

 fetch(`https://statsapi.web.nhl.com/api/v1/people/${countryID}`)
        .then(response => response.json())
        .then(data => {
          this.setState({
            countryData:data
          })

          var modalOutput = '';



    for (var i in this.state.countryData.people) {
           modalOutput += 
      `<section id="modal">
        <div class="modal-content">
          <span id="closeBtn">&times;</span>
        <div class="modal-half">
          <h1>City of Birth: <span class="modal-info">${this.state.countryData.people[i].birthCity}</span></h1>
          <br />
          
          <h1>Country of Birth: <span class="modal-info">${this.state.countryData.people[i].birthCountry}</span></h1>
          <br />
          <h1>Nationality: <span class="modal-info">${this.state.countryData.people[i].nationality}</span></h1>
        </div>
      </section>
     `

    document.getElementById('country').innerHTML = modalOutput;

    // Get modal elements
     var modal = document.getElementById("modal");
     var closeBtn = document.getElementById("closeBtn");

     //function to close modal
      function closeModal() {
        modal.style.display='none';
      }

      // Listen for close click
      closeBtn.addEventListener('click', closeModal);

      //function to close modal if outside click 
        function outsideClick(e) {
          if (e.target == modal) {
            modal.style.display='none'; 
          }
        }

      //listen for outside click
      window.addEventListener('click', outsideClick);
     
    

    } // End of Loop


  
  }) // End of Country Data 
  
  }


   

  render() {
    return (
      <div>
        <ul id="openModal"><li id="rosterInfo" onClick={this.getCountry}></li></ul>
        <section id="country"></section>
      </div>
    );
  }
}

export default Roster;
