import { useState } from 'react';
const PersonSelector = ({ people, selectedPerson, onChange }) => {

  
  return (
    <>
    
    <div className="select-container">
  <label className="select-label" htmlFor="person">Elemanı Seç:</label>
  <select className="select-dropdown" id="person" value={selectedPerson} onChange={onChange}>
    {people.map((person, index) => (
      <option key={index} value={person}>
        {person}
      </option>
    ))}
  </select>
</div>

    </>


  );
};

export default PersonSelector;
