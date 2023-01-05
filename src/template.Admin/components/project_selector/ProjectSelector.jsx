import React, { useContext, useState } from 'react';
import ProjectContainer from './ProjectContainer';
import Combobox from "react-widgets/Combobox";
import { Autocomplete, TextField } from '@mui/material';
import { useEffect } from 'react';
import AxiosService from 'services/AxiosService';
import { Store } from "Providers/provider";


const ProjectSelector = ({ setView, clientSelected, setClientSelected, lobSelected, setLobSelected,setStartDate, setEndDate, projectSelected, setProjectSelected }) => {

    
    const axiosService = new AxiosService();
    const storage = useContext(Store);
    
    const { markets, setMarkets, clients, setClients, marketSelected, setMarketSelected,lobs, setLobs, projects, setProjects, setProjectName } = storage;

    const handleNewProject = () => {
        setView(4);
        setProjectName('');
        sessionStorage.setItem('projectName', '');
    };


    useEffect(() => {
        function getMarkets () {
            axiosService.getData('Market/GetMarkets')
                .then((response) => {
                    const newMarkets = response.map((market, index) => {
                        return {
                            id: index,
                            label: market.market
                        }
                    });

                    setMarkets(newMarkets);
                })
                .catch((error) => {
                    console.log('error', error);
                });
        }
        getMarkets();
    }, []);

    useEffect(() => {
        function getClients () {
            axiosService.getData(`Market/GetClients/${marketSelected}`)
                .then((response) => {
                    const newClients = response.map((client, index) => {
                        return {
                            id: client.id,
                            label: client.name,
                            fullname: client.fullname
                        }
                    });

                    console.log('newClients', newClients);
                    setClients(newClients);
                })
                .catch((error) => {
                    console.log('error', error);
                });
        }

        if (!marketSelected) return;
        getClients();

    }, [marketSelected]);

    useEffect(() => {
        function getLobs () {
            axiosService.getData(`Market/GetLOBs/${clientSelected?.id}`)
                .then((response) => {
                    const newLobs = response.map((lob, index) => {
                        return {
                            id: lob.id,
                            label: lob.name
                        }
                    });
                    setLobs(newLobs);
                })
                .catch((error) => {
                    console.log('error', error);
                });
        }

        if (!clientSelected) return;
        getLobs();

    }, [clientSelected]);


    const hableCallProject = async (id) => {
        console.log('id', id);
        const response = await axiosService.getData(`Project/GetProjectsByLob/${id}`);
        setProjects(response);
    };


    return (
        <div>
            <div className="position-relative">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                        className="nav-link active"
                        id="nav-process-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-process"
                        type="button"
                        role="tab"
                        aria-controls="nav-process"
                        aria-selected="true"
                    >
                        On Process
                    </button>
                    <button
                        className="nav-link"
                        id="nav-finished-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-finished"
                        type="button"
                        role="tab"
                        aria-controls="nav-finished"
                        aria-selected="false"
                    >
                        Finished
                    </button>

                    <div className="d-flex ms-auto gap-2">
                        {
                            markets && 
                            
                            <Autocomplete
                                disablePortal
                                options={markets || []}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Market" />}
                                size="small"
                                value={marketSelected}
                                onChange={(event, newValue) => {
                                    setMarketSelected(newValue.label);
                                    setClientSelected(null);
                                    setLobSelected(null);
                                }}
                                isOptionEqualToValue={(option, value) => option.label === value}
                                style={{
                                    maxHeight: '43px',
                                    maxWidth: '150px',
                                }}
                            />

                        }
                        {
                            marketSelected &&
                                <Autocomplete
                                    disablePortal
                                    options={clients || []}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Client" />}
                                    size="small"
                                    value={clientSelected}
                                    onChange={(event, newValue) => {
                                        setClientSelected(newValue);
                                        setLobSelected(null);
                                    }}
                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                    style={{
                                        maxHeight: '43px',
                                        maxWidth: '150px',
                                    }}
                            />
                        }
                        {
                            clientSelected &&
                            <Autocomplete
                                disablePortal
                                options={lobs || []}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Lob's" />}
                                size="small"
                                value={lobSelected}
                                onChange={(event, newValue) => {
                                    setLobSelected(newValue);
                                    hableCallProject(newValue.id);
                                }}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                style={{
                                    maxHeight: '43px',
                                    maxWidth: '150px',
                                }}
                            />
                        }

                        
                        <button
                            className={lobSelected ? 'button' : 'btn btn-danger disabled'}
                            onClick={handleNewProject}
                            style={{
                                maxHeight: '43px',
                            }}
                        >
                            <img
                                src="/static/images/NuevoProyectoIcono.png"
                                alt=""
                                className="me-2"
                            />
                            {
                                lobSelected ? 'New Project' : 'Select a lob'
                            }
                        </button>
                        <div className="search_input">
                            <input
                                type="text"
                                placeholder="Search"
                                className="search"
                            />
                            <img
                                src="/static/images/search-icon.png"
                                alt=""
                                className="search_icon"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="tab-content" id="nav-tabContent">
                <div
                    className="tab-pane fade show active"
                    id="nav-process"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                >
                    {
                        projects.length > 0 && projects.map((project, index) => {
                            console.log('project', project);
                            return (
                                <ProjectContainer project={project} key={index} setView={setView} setStartDate={setStartDate} setEndDate={setEndDate} projectSelected={projectSelected} setProjectSelected={setProjectSelected} />
                            )
                        }) || <div className="text-center mt-5">
                            <img src="/static/images/NoProjects.png" alt="" />
                            <h3 className="mt-3">No projects</h3>
                        </div>
                    }
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-finished"
                    role="tabpanel"
                    aria-labelledby="nav-finished-tab"
                >
                    .aqwe..
                </div>
            </div>
        </div>
    );
};

export default ProjectSelector;
