import React from 'react'

const Process_filter = ({process}) => {
    const { text, options } = process

  return (
    <div className="process_filter_container d-flex flex-column justify-content-center">
        <p className="m-0">{text}</p>

        <select name="" id="" className="form-select filter_font mt-2">
            {options.map((option, index) => (
                <option key={index} value={option.key}>{option.value}</option>
            ))}
        </select>

    </div>
  )
}

export default Process_filter