import React, { useEffect, useState } from 'react';

const TxtAreaCreator = ({
    problemDetails,
    setProblemDetails,
    results,
    setResults,
    whys,
    setWhys,
}) => {


    const removeWhyFromIndex = (index) => {
        if (whys.length === 1) {
            return;
        }

        const newWhys = [...whys];
        newWhys.splice(index, 1);
        setWhys(newWhys);
        sessionStorage.setItem('whys', JSON.stringify(newWhys));
    };

    const addWhy = () => {
        if (whys.length >= 5) {
            return;
        }
        setWhys([...whys, '']);
    };

    console.log('whys', whys);



    return (
        <div className="d-flex flex-column justify-content-center gap-4">

            <div className="mb-4 five_whys_container d-flex">
                <div>
                    <div
                        style={{
                            borderRadius: '8px',
                            backgroundColor: '#db2388',
                            color: '#fff',
                            padding: '5px 5px',
                            marginBottom: '10px',
                            width: '250px',
                        }}
                    >
                        <h3
                            className="m-0"
                            style={{
                                fontSize: '20px',
                                textAlign: 'center',
                                colors: '#db2388',
                            }}
                        >
                            Problem
                        </h3>
                    </div>
                    <textarea
                        className="text_area_pc"
                        name=""
                        id=""
                        value={problemDetails}
                        onChange={(e) => setProblemDetails(e.target.value)}
                        onBlur={(e) => sessionStorage.setItem('problemDetails', e.target.value)}
                        style={{
                            height: '390px',
                            width: '250px',
                        }}
                    ></textarea>
                </div>
                <div 
                    className="d-flex flex-wrap justify-content-center"
                    >
                {whys.map((why, index) => (
                    <div 
                        key={index}
                        className="d-flex justify-content-center ms-2"
                    >
                        <div className="mb-1">
                            <div
                                style={{
                                    borderRadius: '8px',
                                    backgroundColor: '#fe1e82',
                                    color: '#fff',
                                    marginBottom: '10px',
                                    fontSize: '20px',
                                    height: '35px',
                                    width: '250px',
                                    textAlign: 'center',
                                }}
                            >
                                <p className="m-0" style={{
                                        fontSize: '20px',
                                    }}>
                                    {index + 1} Why?
                                    {
                                        whys.length > 1 && (<span
                                            className=""
                                            onClick={() =>
                                                removeWhyFromIndex(index)
                                            }
                                        >
                                            <img
                                                src="/static/images/Grupo 252.png"
                                                alt=""
                                                width={20}
                                                style={{
                                                    marginLeft: '20px',
                                                }}
                                            />
                                        </span>
                                        )
                                    }
                                </p>
                            </div>

                            <textarea
                                className="text_area_pc"
                                name="textArea"
                                id={`why_textArea${index}`}
                                value={why}
                                onChange={
                                    (e) => {
                                        const newWhys = [...whys];
                                        newWhys[index] = e.target.value;
                                        setWhys(newWhys);
                                    }
                                }
                                onBlur={() => {
                                    sessionStorage.setItem(
                                        'whys',
                                        JSON.stringify(whys)
                                    );
                                }}
                                
                                style={{
                                    height: '165px',
                                    width: '250px',
                                }}
                            ></textarea>
                        </div>
                        
                    </div>

                    
                    
                ))}
                </div> 
                <div className="ms-2 d-flex">
                    <div className=''
                        style={{
                            position: 'relative',
                            top: '190px',
                        }}
                    >
                        <button
                            className="btn btn_delete_why me-2"
                            onClick={addWhy}
                            style={{
                                
                            }}
                        >
                            <p className='fs-1 ms-1' 
                                style={{
                                    position: 'relative',
                                    top: '-21px',
                                    left: '-9px',
                                }}
                            >
                                +
                            </p>
                        </button>
                    </div>
                    <div>
                        <p
                            className="mb-2 me-2"
                            style={{
                                borderRadius: '8px',
                                backgroundColor: '#5b0641',
                                color: '#fff',
                                marginBottom: '10px',
                                fontSize: '20px',
                                height: '35px',
                                width: '250px',
                                textAlign: 'center',
                            }}
                        >
                            Result
                        </p>
                        <textarea
                            className="text_area_pc"
                            name=""
                            id=""
                            value={results}
                            onChange={(e) => setResults(e.target.value)}
                            onBlur={(e) => {
                                sessionStorage.setItem('results', e.target.value);
                            }}
                            style={{
                                height: '390px',
                                width: '250px',
                            }}
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TxtAreaCreator;
