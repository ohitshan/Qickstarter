import { Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import AutoComplete from "react-google-autocomplete";
import "./Search.css";

interface LocationSearchProps {
  getLocationValue(location: string): void;
}

function LocationSearch({ getLocationValue }: LocationSearchProps) {
  const [location, setLocation] = useState("");

  const sendLocationValue = useCallback(() => {
    getLocationValue(location);
  }, [location, getLocationValue]);

  useEffect(() => {
    sendLocationValue();
  }, [location]);

  const locationChange = useCallback((e) => {
    setLocation(e.target.value);
  }, []);

  return (
    <Select
      style={{ margin: "0 5px" }}
      value={location || "Earth"}
      placeholder="Earth"
      size={"large"}
      dropdownMatchSelectWidth={false}
      dropdownStyle={{ width: "400px", zIndex: 1 }}
      dropdownRender={(menu) => (
        <AutoComplete
          onChange={locationChange}
          apiKey={"AIzaSyDgcRtWSk1vzqT0cT4_f4r5dllTYPkpiVA"}
          onPlaceSelected={(place) => setLocation(place.formatted_address)}
          style={{
            width: "90%",
            height: "40px",
            paddingLeft: 16,
            margin: "20px",
          }}
        />
      )}
    ></Select>
  );
}

export default LocationSearch;
