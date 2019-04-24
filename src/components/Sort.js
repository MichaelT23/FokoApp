import React, { Component } from 'react';


class Sort extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }


  }

  render() {
    return (
      <div>
         <section>
          <div className="sort-options">
           <span id="sort">Sort By</span><select name="sortby" className="sortby"onClick = {this.props.sortingData}>
            <option>---</option>
              <option value="name">Name</option>
              <option value="jerseyNumber">Jersey Number</option>
            </select>
          </div>
        </section>

    <section id="filter">
      <span id="f">Filter</span>
      
      <select id="select2" name="position" onClick = {this.props.filteredData} >
        <option value='All'>--</option>
        <option value='Goalie'>Goalie</option>
        <option value='Center'>Center</option>
         <option value='Defenseman'>Defenseman</option>
         <option value='Right Wing'>Right Wing</option>
         <option value='Left Wing'>Left Wing</option>
      </select>
    </section>


      </div>
    );
  }
}

export default Sort;