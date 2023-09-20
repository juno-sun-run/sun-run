import React from "react";

const Location = ({ value, onChange, places, showSuggestions }) => {
  return (
    <div className="location">
      <input
        type="text"
        value={value}
        onChange={onChange}
        required
        placeholder="Enter your address"
      />
      <div className={`suggestions ${showSuggestions ? "" : "hidden"}`}>
        {places.map(({ display_name, place_id }) => (
          <button key={place_id} type="submit" value={place_id}>
            {display_name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Location;