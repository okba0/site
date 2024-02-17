import React from 'react';

const DatePicker = ({ selectedStartDate, selectedEndDate, onStartDateChange, onEndDateChange }) => {
  return (
    <div className="date-container">
      <div className="date-containeri">
        <label className="date-label" htmlFor="start-date">Başlama Tarihi:</label>
        <input className="date-input" type="date" id="start-date" value={selectedStartDate} onChange={onStartDateChange} />
      </div>
      <div className="date-containeri">
        <label className="date-label" htmlFor="end-date">Bitirme Tarihi:</label>
        <input className="date-input" type="date" id="end-date" value={selectedEndDate} onChange={onEndDateChange} />
      </div>

  </div>
  
  );
};

export default DatePicker;
