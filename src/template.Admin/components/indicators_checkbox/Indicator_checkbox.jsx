import React, { useEffect, useState } from 'react';

const Indicator_checkbox = ({setSelectedIndicators, selectedIndicators}) => {

    const indicators = [
        {
            IdKpi: 1,
            KpiName: 'AHT',
        },
        {
            IdKpi: 2,
            KpiName: 'ATT',
        },
        {
            IdKpi: 3,
            KpiName: 'C-SAT',
        },
        {
            IdKpi: 4,
            KpiName: 'ABS',
        },
        {
            IdKpi: 5,
            KpiName: 'TRANSFER RT',
        },
        {
            IdKpi: 6,
            KpiName: 'FIXED_WIRELESS',
        },
        {
            IdKpi: 7,
            KpiName: '7 DAY CRM REPEAT RT',
        },
        {
            IdKpi: 8,
            KpiName: 'RESOLVE RT',
        },
        {
            IdKpi: 9,
            KpiName: 'QA',
        },
        {
            IdKpi: 10,
            KpiName: 'ISSUE RESOLUTION',
        },
    ];
    
    const handleIndicatorChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedIndicators([...selectedIndicators, value]);
        } else {
            setSelectedIndicators(selectedIndicators.filter((indicator) => indicator !== value));
        }
  
    };

    useEffect(() => {
        if(selectedIndicators.length > 0){
            sessionStorage.setItem('selectedIndicators', JSON.stringify(selectedIndicators));
        }
    }, [selectedIndicators]);

    useEffect(() => {
        const selectedIndicators = JSON.parse(sessionStorage.getItem('selectedIndicators'));
        if (selectedIndicators) {
            setSelectedIndicators(selectedIndicators);
        }
    }, []);

    return (
        <div className="col-2">
            <div className='checkbox_container'>
                <div className="project_charter_container">
                    {indicators.map((indicator, index) => (
                        <div
                            key={index}
                            className="d-flex align-items-center gap-2 mb-2"
                        >
                            <input
                                type="checkbox"
                                name={indicator.KpiName}
                                id={indicator.KpiName}
                                value={indicator.IdKpi}
                                checked={selectedIndicators.includes(indicator.IdKpi.toString())}
                                onChange={handleIndicatorChange}
                                style={{ cursor: 'pointer' }}
                            />
                            <label htmlFor={indicator.KpiName} style={{ cursor: 'pointer' }}>
                                {indicator.KpiName}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Indicator_checkbox;
