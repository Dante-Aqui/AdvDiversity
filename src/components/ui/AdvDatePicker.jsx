import React, { forwardRef } from 'react'
import DatePicker from "react-datepicker";
import PropTypes from "prop-types"
import classNames from 'classnames';
import debug from "sabio-debug"


/* Datepicker with input*/
const DatepickerInput = forwardRef((props, ref) => {
    const _logger = debug.extend("Datepicker")
    const onDateValueChange = () => {
        _logger("date value change")
    };
    return (
        <input
            type="text"
            className='form-control date'
            onClick={props.onClick}
            value={props.value}
            onChange={onDateValueChange}
            ref={ref}
        />
    )
});

/* Datepicker with Addon Input*/

const DatePickerInputWithAddon = forwardRef((props, ref) => (
    <div className='input-group' ref={ref}>
        <input
            type="text"
            className='form-control form-control-light'
            onClick={props.onClick}
            value={props.value}
            readOnly
        />
        <div className='input-group-append'>
            <span className='input-group-text bg-primary border-primary text-white'>
                <i className='mdi mdi-calendar-range font-13'></i>
            </span>
        </div>
    </div>
));

const AdvDatePicker = (props) => {
    //handle custom input
    const input =
        (props.isHideAddon || false) === true ? (
            <DatePicker />
        ) : (
            <DatePickerInputWithAddon />
        )
    return (
        <>
            {/*Date picker control*/}
            <DatePicker
                customInput={input}
                timeIntervals={props.tI}
                className={classNames('form-control', props.inputClass)}
                selected={props.value}
                onChange={(date) => props.onChange(date)}
                showTimeSelect={props.isShowTimeSelect}
                timeFormat="hh:mm a"
                timeCaption={props.timeCaption}
                dateFormat={props.dateFormat || 'MM/dd/yyyy'}
                minDate={props.minDate}
                maxDate={props.maxDate}
                monthsShown={props.monthsShown}
                showTimeSelectOnly={props.isShowTimeSelectOnly}
                inline={props.isInline}
                autoComplete="off"
            />
        </>
    )
}

DatepickerInput.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string
}

DatePickerInputWithAddon.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string
}

AdvDatePicker.propTypes = {
    value: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
    isHideAddon: PropTypes.bool,
    inputClass: PropTypes.string,
    dateFormat: PropTypes.string,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    isShowTimeSelect: PropTypes.bool,
    tI: PropTypes.number,
    timeCaption: PropTypes.string,
    isShowTimeSelectOnly: PropTypes.bool,
    monthsShown: PropTypes.number,
    isInline: PropTypes.bool

}

export default AdvDatePicker;