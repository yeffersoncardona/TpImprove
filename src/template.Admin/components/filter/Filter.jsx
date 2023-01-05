import React, { useState } from 'react';
import { useEffect } from 'react';
import { getNowDate } from 'utilities/functions';

const Filter = ({
    client,
    setClient,
    Lob,
    setLob,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    periodicity,
    setPeriodicity,
    marketSelected,
    clientSelected,
    lobSelected,
}) => {

    useEffect(() => {
        sessionStorage.setItem('client', clientSelected.label);
        sessionStorage.setItem('Lob', lobSelected.label);
    }, [clientSelected , lobSelected]);

    return (
        <>
            <div className='row justify-content-center' style={{
                maxWidth: '1280px',
                margin: '0 auto',
                borderBottom: '1px solid #848484',
                paddingBottom: '10px'
            }}>
                <div className='col-2 d-flex'>
                    <label htmlFor="select_campaign" className="m-0 me-2">
                        Client:
                    </label>
                    <p className='text_filter m-0 ms-1 fw-bold'>
                        {clientSelected.label}
                    </p>
                </div>

                <div className='col-2 d-flex'>
                        <label htmlFor="select_lob" className="m-0  me-2">
                            Lob:
                        </label>
                        <p className='text_filter m-0 ms-1 fw-bold'>
                            {lobSelected.label}
                        </p>
                </div>

                <div className='col-2 d-flex'>
                    <label htmlFor="select_start_date" className="m-0  me-2">
                            Start Date:
                        </label>
                        <input
                            type="date"
                            id="select_start_date"
                            className="form-control filter_font"
                            onChange={(e) => {
                                setStartDate(e.target.value)
                                sessionStorage.setItem('startDate', e.target.value);
                            }}
                            value={startDate}
                            style={{ cursor: 'pointer',
                            width: '60%'
                        }}
                        />
                </div>

                <div className='col-2 d-flex'>
                    <label htmlFor="select_end_date" className="m-0  me-2">
                        End Date:
                        </label>
                    <input
                        type="date"
                        id="select_end_date"
                        className="form-control filter_font"
                        value={endDate || ''}
                        onChange={(e) => {
                            setEndDate(e.target.value)
                            sessionStorage.setItem('endDate', e.target.value);
                        }}
                        style={{ cursor: 'pointer',
                        width: '60%' }}
                        max={getNowDate()}
                    />
                </div>
            </div>

            <div className='d-flex w-100 justify-content-between'>
            </div>
        </>
    );
};

export default Filter;
