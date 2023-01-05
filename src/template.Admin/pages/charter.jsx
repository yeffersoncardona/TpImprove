import { Troubleshoot } from '@mui/icons-material';
import Analyze from 'components/analyze/Analyze';
import TxtAreaCreator from 'components/auto_create_txt_area/TxtAreaCreator';
import Filter from 'components/filter/Filter';
import Indicator_checkbox from 'components/indicators_checkbox/Indicator_checkbox';
import Process from 'components/process/Process';
import Process_filter from 'components/process_filter/Process_filter';
import Project_charter from 'components/project_charter/Project_charter';
import Construction from 'components/under_construction/Construction';
import React, { useEffect, useState } from 'react';
import AxiosService from 'services/AxiosService';

import Icon from '../static/images/Icon.png';

const charter = () => {
    const service = new AxiosService();

    const [campaign, setCampaign] = useState('');
    const [Lob, setLob] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [periodicity, setPeriodicity] = useState('');
    const [loading, setLoading] = useState(false);

    const [projectId, setProjectId] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projecCharter , setProjectCharter] = useState({});
    const [projectCharterId, setProjectCharterId] = useState('');

    const [selectedIndicators, setSelectedIndicators] = useState([]);

    const [process, setProcess] = useState('');

    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState('');



    useEffect(() => {
      
        if (process === 'define' && projectId !== '') {
            async function getProjectCharter() {
                setLoading(true);
                await service
                    .getData(`ProjectCharter/GetCharterId?idproject=${projectId}`)
                    .then((res) => {

                        setLoading(false);
                        setProjectCharterId(res.idDetailsProject);
                        setProjectCharter(res);
                        console.log('respuesta de getProjectCharter: ', res);
                        sessionStorage.setItem('problemStatus', res.problemStatus);
                        sessionStorage.setItem('projectRequeriment', res.projectRequeriment);
                        sessionStorage.setItem('members', res.members);
                        sessionStorage.setItem('reach', res.reach);
                        sessionStorage.setItem('outOfReach', res.outReach);
                        sessionStorage.setItem('goals', res.goals);
                        sessionStorage.setItem('proposal', res.proposal);

                    }).catch((err) => {
                        setLoading(false);
                        console.log(err);
                    });
            }
            getProjectCharter();
        }

    }, [process , projectId]);
    



    const handleSection = ({
        process,
        selectedIndicators,
        setSelectedIndicators,
    }) => {
        if (process === 'six_sigma') {
            return <Construction />;
        } else if (process === 'imp_analysis') {
            return <Construction />;
        } else if (process === 'define') {
            

            return (
                <>
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
                            <Project_charter
                                projecCharter={projecCharter}
                                selectedIndicators={selectedIndicators}
                                projectName={projectName}
                                setProjectName={setProjectName}
                                projectId={projectId}
                                setProjectId={setProjectId}
                                projectCharterId={projectCharterId}
                                setProjectCharterId={setProjectCharterId}
                            />
                            <Indicator_checkbox
                                setSelectedIndicators={setSelectedIndicators}
                                selectedIndicators={selectedIndicators}
                            />
                        </>
                    )}
                </>
            );
        } else if (process === 'measure') {
            return <Construction />;
        } else if (process === 'analyze') {
            return (
                <>
                    <Analyze
                        projectName={projectName}
                        setProcess={setProcess}
                    />
                </>
            );
        } else if (process === 'improve') {
            return <Construction />;
        } else if (process === 'control') {
            return <Construction />;
        }
    };

    useEffect(() => {
        async function getProjects() {
            setLoading(true);
            await service.getData('Project/list').then((res) => {
                setProjects(res);
                setLoading(false);
            });
        }

        getProjects();
    }, []);


    return (
        <div className="bg_main">
            <div className="nav_bar">
                {/* <div className="d-flex">
                    <p className="m-0 text-white fw-bold">Categories</p>
                    <input type="text" />
                </div> */}
                <div className="d-flex">
                    <img
                        src="../static/images/Icon.png"
                        alt="icon"
                        className="icon"
                    />
                    <p className="nav_title">Improve</p>
                </div>

                <div className="d-flex">
                    <p className="m-0">Select Project</p>
                    <select
                        defaultValue={''}
                        className="select_project"
                        onChange={(e) => {
                            const value = e.target.value;

                            if (value === '') {
                                setProject('');
                                setProjectName('');
                                setProjectId('');
                                return;
                            }

                            async function getProject() {
                                service.getData(`Project/${value}`).then((res) => {
                                    setProject(res);
                                    setProjectName(res.projectName);
                                    sessionStorage.setItem('projectName', res.projectName);
                                    setProjectId(res.idProject);
                                });

                                /* service.getData(`ProjectCharter/GetCharterId?idproject=${value}`).then((res) => {
                                    setSelectedIndicators(res.indicators);
                                }); */
                                sessionStorage.setItem('selectedIndicators', JSON.stringify(["1","2","3","6"]));
                            }

                            getProject();


                        }}
                    >
                        <option value="">Select Project</option>
                        {loading ? (
                            <option value="">Loading...</option>
                        ) : (
                            projects &&
                            projects.map((project, index) => (
                                <option key={index} value={project.idProject}>
                                    {project.projectName}
                                </option>
                            ))
                        )}
                    </select>
                </div>
            </div>
            <div className="container_main w-100">
                <div className="d-flex justify-content-center gap-3 filter_main_container">
                    <Filter
                        setCampaign={setCampaign}
                        setLob={setLob}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        setPeriodicity={setPeriodicity}
                    />
                </div>
                <div className="mt-5 d-flex gap-2 justify-content-center process_main_container">
                    {
                        campaign && Lob && startDate && endDate ? (
                        <Process setProcess={setProcess} />
                                            ) : (
                        <h1 className="text-white">
                            Please fill all the fields
                        </h1>
                    )
                    }
                </div>

                {process ? (
                    <div className="process_content_main_container mt-3">
                        <div className="row p-4">
                            {handleSection({
                                process,
                                selectedIndicators,
                                setSelectedIndicators,
                            })}
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default charter;

{
    /*
                 <div className='process_list_main_container mt-5 ms-4'>
                  <Process_filter process={{
                    text: 'Type of analysis',
                    options: [
                      { key: 'spoc', value: 'SPOC'},
                      { key: 'project_charter', value: 'PROJECT CHARTER'},
                    ]
                  }} />
                </div> 
*/
}
