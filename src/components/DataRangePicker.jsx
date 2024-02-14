
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// eslint-disable-next-line react/prop-types
const DateRangePicker = ({ startDate, endDate, onStartDateChange, onEndDateChange, onFilterClick }) => {
  return (
    <div className="flex items-center space-x-2">
      <DatePicker
        selected={startDate}
        onChange={onStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Fecha inicial"
      />
      <DatePicker
        selected={endDate}
        onChange={onEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        placeholderText="Fecha final"
      />
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded"
        onClick={onFilterClick}
      >
        Filtrar por Fecha
      </button>
    </div>
  );
};

export default DateRangePicker;
