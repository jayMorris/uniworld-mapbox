import React from "react";
import DayToDay from "./DayToDay";
import Slider from "react-slick";

function DayToDayCarousel(props) {
  //console.log(props.currentItinerary.dayToDays[0][0].city.CityName);

  function DayToDayDetails() {
    let itinerary = props.currentItinerary.dayToDays[0];
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: false,
      afterChange: i => {
        props.goToDay(i);
      }
    };
    let DayToDayDetailsItems = itinerary.map((d, i) => (
      <DayToDay
        key={i}
        city={d.city.CityName}
        country={d.city.CountryName}
        dayNumber={d.day}
        overview={d.dayOverview}
        ships={d.ships}
      />
    ));
    return <Slider {...settings}>{DayToDayDetailsItems}</Slider>;
  }

  return (
    <div className="col s12">
      <div>
        {/* <h5>{`From ${props.currentItinerary.fromCity} to ${
          props.currentItinerary.toCity
        }`}</h5> */}
        <h5>{props.currentItinerary.title}</h5>
        {/* <button
          className="waves-effect waves-light btn"
          onClick={props.viewNextDay}
        >
          {`Day ${props.dayNumber + 1} ${
            props.currentItinerary.dayToDays[0][props.dayNumber].city.CityName
          }, ${
            props.currentItinerary.dayToDays[0][props.dayNumber].city
              .CountryName
          }`}
        </button> */}
        <div>{DayToDayDetails()}</div>
      </div>
    </div>
  );
}

export default DayToDayCarousel;
