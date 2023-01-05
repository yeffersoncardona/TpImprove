import React, { useEffect, useState } from 'react';
import AxiosService from 'services/AxiosService';
import Swal from 'sweetalert2';

const Project_charter = ({selectedIndicators,
            projectName,
            setProjectName,
            projectId,
            setProjectId,
            projectCharterId,
            setProjectCharterId,
            projecCharter
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


    useEffect(() => {
        if (projecCharter) {
            /* setProblemStatus(projecCharter.problemStatus);
            setProjectRequeriment(projecCharter.projectRequeriment);
            setMembers(projecCharter.members);
            setReach(projecCharter.reach);
            setOutOfReach(projecCharter.outReach);
            setGoals(projecCharter.goals);
            setProposal(projecCharter.proposal); */

            /* sessionStorage.setItem('problemStatus', projecCharter.problemStatus);
            sessionStorage.setItem('projectRequeriment', projecCharter.projectRequeriment);
            sessionStorage.setItem('members', projecCharter.members);
            sessionStorage.setItem('reach', projecCharter.reach);
            sessionStorage.setItem('outOfReach', projecCharter.outReach);
            sessionStorage.setItem('goals', projecCharter.goals);
            sessionStorage.setItem('proposal', projecCharter.proposal); */
        }
    }, [projecCharter]);


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
            /* idProject: projectId, */
            createDate: new Date().toISOString(),
            isActive: true,
            problemStatus,
            projectKpi: selectedIndicators.map((indicator, index) => {
                return {
                    idProjectKpi: 1,
                    idProject: 1,
                    idKpi: indicator,
                    createDate: new Date().toISOString(),
                    isActive: true,
                }
            })
        };  


        if (projectName === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill the project name',
            });
            return;
        }

        if([problemStatus, projectRequeriment, members, reach, outOfReach, goals, proposal].includes('')){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields',
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
                                setProjectCharterId(response.outputinsert);
                                sessionStorage.setItem('projectCharterId', response.outputinsert);
                            })
                        } 
                        else {
                            dataCreatePC.idProject = projectId;
                            console.log('Si hay id de project charter');
                            dataCreatePC.idDetailsProject = projectCharterId;
                            axiosService.updateDataBody('projectCharter', dataCreatePC)
                            .then((response) => {
                                setProjectCharterId(response.outputinsert);
                                sessionStorage.setItem('projectCharterId', response.outputinsert);
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
                                console.log('response1', response);
                                 setProjectCharterId(response.outputinsert);
                                /*sessionStorage.setItem('projectCharterId', response.outputinsert); */
                            })
                        } 
                        else {
                            console.log('Si hay id de project charter --->', projectCharterId);
                            dataCreatePC.idDetailsProject = projectCharterId;
                            axiosService.updateDataBody('projectCharter', dataCreatePC)
                            .then((response) => {
                                console.log('response2', response);
                                setProjectCharterId(response.outputinsert);
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

    console.log('projectId----->', projectId);
    console.log('projectCharterId----->', projectCharterId);

    return (
        <>
            <div className="d-flex ms-3 mb-4">
                <div>
                    <label
                        className="text-white fw-bold me-2"
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
                    />
                </div>
                <button
                            className="btn ms-2"
                            style={{
                                backgroundColor: '#fe1e82',
                                color: '#fff',
                                width: '200px',
                            }}
                            onClick={handleSubmmit}
                        >
                            SAVE
                </button>
            </div>
            <div className="project_charter_main_container col-10">
                <h2 className='text-center mt-2 fw-bold'>PROJECT CHARTER STAGE</h2>
                <div className="row">
                    <div className="col-3">
                        <div className="title_input_charter">
                            <p className="mb-0">PROBLEM STATUS</p>
                        </div>
                        <textarea
                            name=""
                            id="problemStatus"
                            rows="7"
                            className="w-100 text_area_pc"
                            value={problemStatus}
                            onChange={(e) => setProblemStatus(e.target.value)}
                            onBlur={(e) => {
                                sessionStorage.setItem('problemStatus', e.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div className="col-6">
                        <div className="title_input_charter">
                            <p className="mb-0">PROJECT REQUIREMENT</p>
                        </div>
                        <textarea
                            name=""
                            id="project_requirement"
                            rows="7"
                            className="w-100 text_area_pc"
                            value={projectRequeriment}
                            onChange={(e) =>
                                setProjectRequeriment(e.target.value)
                            }
                            onBlur={(e) => {
                                sessionStorage.setItem( 'projectRequeriment', e.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div className="col-3">
                        <div className="title_input_charter">
                            <p className="mb-0">MEMBERS</p>
                        </div>
                        <textarea
                            name=""
                            id="members"
                            rows="7"
                            className="w-100 text_area_pc"
                            value={members}
                            onChange={(e) => setMembers(e.target.value)}
                            onBlur={(e) => {
                                sessionStorage.setItem('members', e.target.value);
                            }}
                        ></textarea>
                    </div>

                    <div className="col-3">
                        <div className="title_input_charter">
                            <p className="mb-0">REACH</p>
                        </div>
                        <textarea
                            name=""
                            id="reach"
                            rows="7"
                            className="w-100 text_area_pc"
                            value={reach}
                            onChange={(e) => setReach(e.target.value)}
                            onBlur={(e) => {
                                sessionStorage.setItem('reach', e.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div className="col-3">
                        <div className="title_input_charter">
                            <p className="mb-0">OUT OF REACH</p>
                        </div>
                        <textarea
                            name=""
                            id="out_of_reach"
                            rows="7"
                            className="w-100 text_area_pc"
                            value={outOfReach}
                            onChange={(e) => setOutOfReach(e.target.value)}
                            onBlur={(e) => {
                                sessionStorage.setItem('outOfReach', e.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div className="col-3">
                        <div className="title_input_charter">
                            <p className="mb-0">GOALS</p>
                        </div>
                        <textarea
                            name=""
                            id="goals"
                            rows="7"
                            className="w-100 text_area_pc"
                            value={goals}
                            onChange={(e) => setGoals(e.target.value)}
                            onBlur={(e) => {
                                sessionStorage.setItem('goals', e.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div className="col-3">
                        <div className="title_input_charter">
                            <p className="mb-0">PROPOSAL</p>
                        </div>
                        <textarea
                            name=""
                            id="proposal"
                            rows="7"
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
        </>
    );
};

export default Project_charter;
