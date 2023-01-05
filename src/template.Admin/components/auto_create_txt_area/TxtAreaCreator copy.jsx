import React, { useEffect, useState } from 'react';

const TxtAreaCreator = ({
    textAreas,
    setTextAreas,
    addTextArea,
    removeTextArea,
    handleData,
    removeTextFromIndex,
    problemDetails,
    setProblemDetails,
    results,
    setResults,
}) => {
    useEffect(() => {
        /* cargar de local storage */
        const problemDetails = sessionStorage.getItem('problemDetails');
        if (problemDetails) {
            setProblemDetails(problemDetails);
        }
        const results = sessionStorage.getItem('results');
        if (results) {
            setResults(results);
        }

        const textAreas = sessionStorage.getItem('texareas');
        if (textAreas) {
            setTextAreas(JSON.parse(textAreas));
        }
    }, []);

    return (
        <div className="d-flex flex-column justify-content-center gap-4">
            <div className="mb-4 five_whys_container d-flex  align-items-center">
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
                        onBlur={(e) => {
                            se.setItem(
                                'problemDetails',
                                e.target.value
                            );
                        }}
                        style={{
                            height: '390px',
                            width: '250px',
                        }}
                    ></textarea>
                </div>
                {textAreas.map((textArea, index) => (
                    <div
                        key={index}
                        className="d-flex justify-content-center gap-1 flex-column ms-4"
                    >
                        <div className="mb-1 me-2">
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
                                    <span
                                        className=""
                                        onClick={() =>
                                            removeTextFromIndex(index)
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
                                </p>
                            </div>

                            <textarea
                                className="text_area_pc"
                                name="textArea"
                                id={`why_textArea${index}`}
                                value={textArea.why}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    setTextAreas(
                                        textAreas.map((textArea, i) => {
                                            if (i === index) {
                                                return {
                                                    ...textArea,
                                                    why: value,
                                                };
                                            }
                                            return textArea;
                                        })
                                    );
                                }}
                                onBlur={(e) => {
                                    sessionStorage.setItem(
                                        'texareas',
                                        JSON.stringify(textAreas)
                                    );
                                }}
                                style={{
                                    height: '165px',
                                    width: '250px',
                                }}
                            ></textarea>
                        </div>
                        <div>
                            <div className="d-flex justify-content-between">
                                <div
                                    style={{
                                        borderRadius: '8px',
                                        backgroundColor: '#fe1e82',
                                        color: '#fff',
                                        marginBottom: '10px',
                                        height: '35px',
                                        width: '250px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <p className="m-0" style={{
                                        fontSize: '20px',
                                    }}>
                                        {index + 1} Answer:
                                    </p>
                                </div>
                            </div>
                            <textarea
                                className="text_area_pc"
                                name="textArea"
                                id={`answer_textArea${index}`}
                                value={textArea.answer}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    setTextAreas(
                                        textAreas.map((textArea, i) => {
                                            if (i === index) {
                                                return {
                                                    ...textArea,
                                                    answer: value,
                                                };
                                            }
                                            return textArea;
                                        })
                                    );
                                }}
                                onBlur={(e) => {
                                    sessionStorage.setItem(
                                        'texareas',
                                        JSON.stringify(textAreas)
                                    );
                                }}
                                style={{
                                    height: '165px',
                                    width: '250px',
                                    marginStart: '20px',
                                }}
                            ></textarea>
                        </div>
                        
                    </div>
                    
                ))}

                <button
                    className="btn"
                    style={{
                        border: "4px solid #ff8955",
                        color: '#ff8955',
                        width: '200px',
                        height: '55px',
                        borderRadius: '50%',
                        fontWeight: 'bold',
                    }}
                    onClick={addTextArea}
                >
                    <p className='fs-1 ms-1' 
                        style={{
                            position: 'relative',
                            top: '-14px',
                            left: '-2px',
                        }}
                    >
                        +
                    </p>
                </button>

                <div className="ms-2">
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
    );
};

export default TxtAreaCreator;
