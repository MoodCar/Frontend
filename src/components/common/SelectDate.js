import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { getYear, getMonth } from "date-fns"; // getYear, getMonth 
import DatePicker, { registerLocale } from "react-datepicker";  // 한국어적용
import ko from 'date-fns/locale/ko'; // 한국어적용

registerLocale("ko", ko)
const _ = require('lodash');

const SelectDate = () => {
    const [startDate, setStartDate] = useState(new Date());
    let dateString = new Date(startDate).toLocaleDateString('fr-FR');
    //const [startDate, setStartDate] = useState(new Date().toLocaleDateString('fr-FR'));
    const years = _.range(1990, getYear(new Date()) + 1, 1);
    const months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
    console.log(startDate);
    console.log(dateString);
    // console.log(dateString.toLocaleDateString('fr-FR'));
    // console.log(startDate.toISOString().split('T'));
    // console.log(startDate.toLocaleDateString());
    return (
        <>
        {/* <EditorContainer dateString={dateString} /> */}
        <DatePicker
            renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled
        }) => (
        <div
            style={{
            margin: 10,
            display: "flex",
            justifyContent: "center"
          }}
        >
        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
        </button>
        <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
        >
        {years.map(option => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
        </select>

        <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
            changeMonth(months.indexOf(value))
        }
        >
        {months.map(option => (
            <option key={option} value={option}>
                {option}
            </option>
        ))}
        </select>

        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
        </button>
        </div>
        )}
        selected={startDate}
        dateFormat={"yyyy년 MM월 dd일"}
        value = {startDate}
        onChange = {(date) => {
            setStartDate(date)
            dateString = new Date(date).toLocaleDateString('fr-FR')
            console.log(dateString)
        }}
        locale={ko}
        // onChange={date => setStartDate(date)}
        todayButton="today"
        />
        
        </>
    );
};

export default SelectDate;