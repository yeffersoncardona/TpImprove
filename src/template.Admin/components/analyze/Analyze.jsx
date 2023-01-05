import TxtAreaCreator from 'components/auto_create_txt_area/TxtAreaCreator'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import AxiosService from 'services/AxiosService';

const Analyze = ({projectName,setProcess}) => {

    const axiosService = new AxiosService();

    const [problemDetails, setProblemDetails] = useState('');
    const [results, setResults] = useState('');
    const [whys, setWhys] = useState(['']);
    const [textAreas, setTextAreas] = useState(
        {
            idProblemReasons: 1,
            whys: whys,
            idSourceProblem: 1,
            idFather: 1,
            createDate: new Date().toISOString(),
            isActive: true,
        },
    );

    useEffect(() => {
        const whys = JSON.parse(sessionStorage.getItem('whys'));
        if (whys) {
            setWhys(whys);
        }

        const problemDetails = sessionStorage.getItem('problemDetails');
        if (problemDetails) {
            setProblemDetails(problemDetails);
        }

        const results = sessionStorage.getItem('results');
        if (results) {
            setResults(results);
        }

    }, []);


    const handleData = async () => {

        console.log('whys', whys);

        if (whys.includes('') || problemDetails === '' || results === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields',
            });
            return;
        }

        if (projectName === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill the project name',
            });
            setProcess('define');
            return;
        }

        const data = {
            idSproblem: 1,
            problemDetail: problemDetails,
            idProject: 1,
            result: results,
            createDate: new Date().toISOString(),
            isActive: true,
            problemdetails: whys.map((why, index) => {
                return {
                    idProblemReasons: index + 1,
                    why: why,
                    idSourceProblem: 1,
                    idFather: index + 1,
                    createDate: new Date().toISOString(),
                    isActive: true,
                };
            }),
        } 

        const response = await axiosService.createData('SourceProblem', data);

        await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500,
        });
    }


  return (
    <>

        <div
            style={{
                maxWidth: '1400px',
                margin: '0 auto',
            }}
        >
            <button
                    className="btn ms-2 mb-3"
                    style={{
                        backgroundColor: '#fe1e82',
                        color: '#fff',
                        width: '200px',
                    }}
                    onClick={handleData}
                >
                    SAVE
            </button>
        </div>
    <div style={{
        borderRadius: '15px',
    }}>
        <TxtAreaCreator textAreas={textAreas} setTextAreas={setTextAreas} handleData={handleData} problemDetails={problemDetails} setProblemDetails={setProblemDetails} results={results} setResults={setResults} whys={whys} setWhys={setWhys} />
    </div>
    </>
  )
}

export default Analyze