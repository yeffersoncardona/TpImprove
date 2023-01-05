import React, { useState } from 'react';

const Process = ({
    view,
    setView
}) => {

    const addActive = (e) => {
        const buttons = document.querySelectorAll('.button_outline');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        e.target.classList.add('active');
    }
    

    const procesos = [
        {
            key: 'six_sigma',
            value: 'six_sigma',
            name: 'SIX SIGMA',
            radioDisabled: false,
            vista: 2
        },
        {
            key: 'imp_analysis',
            value: 'imp_analysis',
            name: 'IMPACT ANALYSIS',
            radioDisabled: false,
            vista: 3
        },
        {
            key: 'define',
            value: 'define',
            name: 'DEFINE',
            radioDisabled: false,
            vista: 4
        },
        {
            key: 'measure',
            value: 'measure',
            name: 'MEASURE',
            radioDisabled: false,
            vista: 5
        },
        {
            key: 'analyze',
            value: 'analyze',
            name: 'ANALYZE',
            radioDisabled: false,
            vista: 6
        },
        {
            key: 'improve',
            value: 'improve',
            name: 'IMPROVE',
            radioDisabled: false,
            vista: 7
        },
        {
            key: 'control',
            value: 'control',
            name: 'CONTROL',
            radioDisabled: false,
            vista: 8
        },
    ];

    return (
        <div className='d-flex justify-content-center gap-3 mt-3'>
            {procesos.map((process, index) => {
                return (
                    <div key={index}>
                        <button className={`button_outline ${index + 2 === view ? 'button_outline_active' : ''}`}
                            onClick={(e) => {
                            setView(process.vista);
                            addActive( e );
                        }}>
                            {process.name}
                        </button>
                    </div>

                );
            })}
        </div>
    );
};

export default Process;

