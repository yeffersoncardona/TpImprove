import React, { useEffect, useState } from 'react';
import AxiosService from 'services/AxiosService';
import Swal from 'sweetalert2';

const Define = ({
            projectName,
            setProjectName,
            projectId,
            setProjectId,
            projectCharterId,
            setProjectCharterId,
            projecCharter,
            projectSelected
    }) => {

    const axiosService = new AxiosService();



    const [problemStatus, setProblemStatus] = useState('');
    const [projectRequeriment, setProjectRequeriment] = useState('');
    const [members, setMembers] = useState('');
    const [reach, setReach] = useState('');
    const [outOfReach, setOutOfReach] = useState('');
    const [goals, setGoals] = useState('');
    const [proposal, setProposal] = useState('');


    //! Traer los datos escritos del local storage
    useEffect(() => {

        const prblemStatus = sessionStorage.getItem('problemStatus');
        if (prblemStatus) {
            setProblemStatus(prblemStatus);
        }
        const projectRequeriment = sessionStorage.getItem('projectRequeriment');
        if (projectRequeriment) {
            setProjectRequeriment(projectRequeriment);
        }
        const members = sessionStorage.getItem('members');
        if (members) {
            setMembers(members);
        }
        const reach = sessionStorage.getItem('reach');
        if (reach) {
            setReach(reach);
        }
        const outOfReach = sessionStorage.getItem('outOfReach');
        if (outOfReach) {
            setOutOfReach(outOfReach);
        }
        const goals = sessionStorage.getItem('goals');
        if (goals) {
            setGoals(goals);
        }
        const proposal = sessionStorage.getItem('proposal');
        if (proposal) {
            setProposal(proposal);
        }

        const projectName = sessionStorage.getItem('projectName');
        if (projectName) {
            setProjectName(projectName);
        }

    }, []);




    const handleSubmmit = async (e) => {
        let idProject;
        //! DATA PROJECT NAME
        const dataProjectName = {
            idProject: 1,
            projectName: projectName,
            description: 'STRING',
            idProjectState: 1,
            idLob: 1,
            idUser: 1,
            isActive: true,
            createDate: new Date().toISOString(),
        }
        //! DATA PROJECT CHARTER
        const dataCreatePC = {
            idDetailsProject: 1,
            projectRequeriment,
            members,
            reach,
            outReach: outOfReach,
            goals,
            proposal,
            createDate: new Date().toISOString(),
            isActive: true,
            problemStatus,
            
        };  
        if (projectName === '' || !projectName) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill the project name',
            });
            return;
        }


        async function createP_PC() {

            if (!projectId) {
                console.log('No hay id de proyecto');
                await axiosService.createData('project', dataProjectName)
                    .then((response) => {
                        console.log('response0', response);
                        setProjectId(response.outputinsert);
                        sessionStorage.setItem('projectId', response.outputinsert);
                        dataCreatePC.idProject = response.outputinsert;
                        return response.outputinsert;
                    })
                    .then((res) => {
                        if (!projectCharterId) {
                            dataCreatePC.idProject = res;
                            console.log('No hay id de project charter', projectId);
                            axiosService.createData('projectCharter', dataCreatePC)
                            .then((response) => {
                                console.log('response1', response);
                                setProjectCharterId(response.outputinsert);
                                sessionStorage.setItem('projectCharterId', response.outputinsert);
                            })
                        } 
                        else {
                            dataCreatePC.idProject = projectId;
                            console.log('Si hay id de project charter');
                            dataCreatePC.idDetailsProject = projectCharterId;
                            axiosService.updateDataBody('projectCharter', dataCreatePC)
                            .then((response) => {/* 
                                setProjectCharterId(response.outputinsert); */
                                console.log('response2', response);
                                sessionStorage.setItem('projectCharterId', projectCharterId);
                            })
                        }
                    })
            }
            else {
                console.log('Si hay id de proyecto --->', projectId);
                dataProjectName.idProject = projectId;
                await axiosService.updateDataBody('project', dataProjectName)
                    .then((res) => {
                        console.log('Proyecto actualizado');
                        dataCreatePC.idProject = projectId;
                        if (!projectCharterId) {
                            console.log('No hay id de project charter');
                            axiosService.createData('projectCharter', dataCreatePC)
                            .then((response) => {
                                console.log('response3', response);
                                 setProjectCharterId(response.outputinsert);
                                /*sessionStorage.setItem('projectCharterId', response.outputinsert); */
                            })
                        } 
                        else {
                            console.log('Si hay id de project charter --->', projectCharterId);
                            dataCreatePC.idDetailsProject = projectCharterId;
                            axiosService.updateDataBody('projectCharter', dataCreatePC)
                            .then((response) => {
                                console.log('response4', response);
                                /* 
                                setProjectCharterId(response.outputinsert); */
                                /* sessionStorage.setItem('projectCharterId', response.outputinsert); */
                            })
                        }
                    })

            }
            await Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500,
            });
        }
            createP_PC();
    };

    console.log('proyectname----->', projectName);
    console.log('projectId----->', projectId);
    console.log('projectCharterId----->', projectCharterId);

    return (
        <div className='project_charter_main_container mt-4'>
            <div className="d-flex align-items-center">
                <div className='d-flex'>
                    <label
                        className="fw-bold me-2"
                        htmlFor="project_name"
                    >
                        Project name
                    </label>
                    <input
                        type="text"
                        name="project_name"
                        id="project_name"
                        onChange={(e) => setProjectName(e.target.value)}
                        value={projectName}
                        onBlur={
                            (e) => {
                                if (e.target.value !== '') {
                                    sessionStorage.setItem('projectName', e.target.value);
                                }
                            }
                        }
                    />
                </div>
                <button
                            className="button ms-2"
                            style={{
                                height: '30px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                            onClick={handleSubmmit}
                        >
                            SAVE
                </button>
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-3">
                        <div className="title_input_charter ">
                            <p className="mb-0 text_title_input_charter">Problem Status</p>
                        </div>
                        <textarea
                            name=""
                            id="problemStatus"
                            rows="6"
                            className="w-100 text_area_pc"
                            value={problemStatus}
                            onChange={(e) => setProblemStatus(e.target.value)}
                            onBlur={(e) => {
                                sessionStorage.setItem('problemStatus', e.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div className="col-6">
                        <div className="title_input_charter ">
                            <p className="mb-0 text_title_input_charter">Project Requirement</p> 
                        </div>
                        <textarea
                            name=""
                            id="project_requirement"
                            rows="6"
                            className="w-100 text_area_pc"
                            value={projectRequeriment}
                            onChange={(e) =>
                                setProjectRequeriment(e.target.value)
                            }
                            onBlur={(e) => {
                                sessionStorage.setItem('projectRequeriment', e.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div className="col-3">
                        <div className="title_input_charter ">
                            <p className="mb-0 text_title_input_charter">Members</p>
                        </div>
                        <textarea
                            name=""
                            id="members"
                            rows="6"
                            className="w-100 text_area_pc"
                            value={members}
                            onChange={(e) => setMembers(e.target.value)}
                            onBlur={(e) => {
                                sessionStorage.setItem('members', e.target.value);
                            }}
                        ></textarea>
                    </div>

                    <div className="col-3">
                        <div className="title_input_charter ">
                            <p className="mb-0 text_title_input_charter">Reach</p>
                        </div>
                        <textarea
                            name=""
                            id="reach"
                            rows="6"
                            className="w-100 text_area_pc"
                            value={reach}
                            onChange={(e) => setReach(e.target.value)}
                            onBlur={(e) => {
                                sessionStorage.setItem('reach', e.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div className="col-3">
                        <div className="title_input_charter ">
                            <p className="mb-0 text_title_input_charter">Out of Reach</p>
                        </div>
                        <textarea
                            name=""
                            id="out_of_reach"
                            rows="6"
                            className="w-100 text_area_pc"
                            value={outOfReach}
                            onChange={(e) => setOutOfReach(e.target.value)}
                            onBlur={(e) => {
                                sessionStorage.setItem('outOfReach', e.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div className="col-3">
                        <div className="title_input_charter ">
                            <p className="mb-0 text_title_input_charter">Goals</p>
                        </div>
                        <textarea
                            name=""
                            id="goals"
                            rows="6"
                            className="w-100 text_area_pc"
                            value={goals}
                            onChange={(e) => setGoals(e.target.value)}
                            onBlur={(e) => {
                                sessionStorage.setItem('goals', e.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div className="col-3">
                        <div className="title_input_charter ">
                            <p className="mb-0 text_title_input_charter">Proposal</p>
                        </div>
                        <textarea
                            name=""
                            id="proposal"
                            rows="6"
                            className="w-100 text_area_pc"
                            value={proposal}
                            onChange={(e) => setProposal(e.target.value)}
                            onBlur={(e) => {
                                sessionStorage.setItem('proposal', e.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div className="col-12 my-4">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Define;
