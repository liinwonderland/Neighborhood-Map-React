import React, { Component } from "react";
import {Glyphicon,Button} from 'react-bootstrap';
import * as PlacesAPI from '../placesAPI'

class SideLocations extends Component {
  componentDidMount(){
    this.addStarRating()
  }
  addStarRating=()=>{
    const starTotal = 5
    const starprocenti = (this.props.searchMarker.rating / starTotal)*100
    const starPorcentiRounded = `${(Math.round(starprocenti / 10) * 10)}%`;
    return starPorcentiRounded
  }
  getLocationsDetails=(location)=>{
    PlacesAPI.getPlacesDetails(location.markerId).then((data) =>{
      const place = data.response.venue;
      return place
    })
    console.log(location)
  }
  render() {
    const searchMarker = this.props.searchMarker
    return (

        <li key={searchMarker.id}  ref={c => (this.infoContent = c)}>
          <a
            className={this.props.isActive && this.props.selectedMarkerId === searchMarker.id?'listgroupItem':'list-group-item '}
            onClick={event => {
              this.props.onToogleOpen(
                event,
                searchMarker.id,
                { lat: searchMarker.location.lat, lng: searchMarker.location.lng }
              );
            }}
          >
          <h5> <Glyphicon glyph="cutlery" /> {searchMarker.name}</h5>
          </a>

            {this.props.infoIsOpen &&
              this.props.selectedMarkerId === searchMarker.id && (
                <div id="locationInfo">
                  <Button className="close" bsStyle="link" onClick={this.props.onToogleClose}>X</Button>
                  <p>{searchMarker.location.crossStreet},{searchMarker.location.city} </p>
                  <p>Rating:</p> <div className="stars-empty"> <div className="stars-full" style={{width: this.addStarRating()}}></div></div>
                </div>
              )}

        </li>
    )
  }
}
export default SideLocations;