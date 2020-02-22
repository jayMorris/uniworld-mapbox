import React, { useState, useEffect } from "react";
import "./styles.css";
import Layout from "./Components/Layout";
import Loader from "./Components/Loader";

function App() {
  const [loading, setLoading] = useState(true);
  const [loadItineraries, setLoadItineraries] = useState(false);
  const [itineraries, setitineraries] = useState([]);
  const [itineraryArr, setItineraryArr] = useState([]);

  function callData() {
    setLoadItineraries(true);
  }

  const getRegions = arr => {
    const tempArr = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (!tempArr.includes(arr[i].region)) {
        tempArr.push(arr[i].region);
      }
    }
    const regions = tempArr.map((d, i) => {
      return {
        name: d,
        value: d
      };
    });
    regions.unshift({ name: "all-regions", value: "All Regions" });
    return regions;
  };

  const handleChange = region => {
    if (region === "All Regions") {
      setitineraries(itineraryArr);
    } else {
      const tempArr = itineraryArr.filter((d, i) => {
        return d.region === region;
      });
      setitineraries(tempArr);
    }
    console.log(region);
  };

  useEffect(() => {
    if (loadItineraries) {
      let uniworldAPI =
        "https://cors-anywhere.herokuapp.com/https://new.uniworld.com/api/uniworld/itinerary/GetByMarket/us/";
      fetch(uniworldAPI, {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: "3B786E25-D704-4F5D-81AE-8C3B518FEE99",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
        .then(res => res.json())
        .then(data => renderData(data.SailingYears, "2020", 3, true))
        .catch(err => console.log(err));

      function renderData(data, year, amount) {
        //FILTER data to show specific year and itineraries

        let arr2020 = data
          .filter((d, i) => {
            return !d.Directions.IsReverseDirection;
            //return d.Year === year && !d.Directions.IsReverseDirection;
            //return d.Year === year && i <= amount;
          })
          .map(d => {
            return {
              title: d.Title,
              subTitle: d.SubTitle,
              year: d.Year,
              region: d.Region,
              numberOfDays: d.NumberOfDays,
              shortDescription: d.ShortDescription,
              rivers: d.Rivers,
              ships: d.Ships,
              image: d.PrimaryImage,
              map: d.MapImage,
              fromCity: d.Directions[0].FromCity.CityName,
              toCity: d.Directions[0].ToCity.CityName,
              days: d.NumberOfDays,
              dayToDays: d.Directions.map(d => {
                return d.Days.map(d => {
                  return {
                    day: d.DayNumber,
                    port: d.Port,
                    city: d.City,
                    dayOverview: d.DayOverview
                  };
                });
              })
            };
          });
        setitineraries(arr2020);
        setLoading(false);
        setItineraryArr(arr2020);
        console.log(arr2020);
      }
    }
  }, [loadItineraries]);

  if (loading) {
    return (
      <main>
        <Loader loadItineraries={loadItineraries} callData={callData} />
      </main>
    );
  } else {
    return (
      <Layout
        itineraryArr={itineraryArr}
        itineraries={itineraries}
        getRegions={getRegions}
        handleChange={handleChange}
      />
    );
  }
}

export default App;
