import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { color } from '@mui/system';

const ProjectContainer = ({project, index, setView, setStartDate, setEndDate , projectSelected, setProjectSelected}) => {


  return (
    <div className='project_container d-flex justify-content-between mt-2' key={index}>
        <p className='m-0 project_name_text'>{project.projectName}</p>
        <div className='d-flex gap-2'>
            <div className='d-flex project_view'
              onClick={() => {
                console.log(project)
                setView(4)
                setStartDate('2023-01-01') //! quemado
                setEndDate('2023-01-02') //! quemado
                setProjectSelected(project)
              }}
            >
                <p className='m-0 project_name_text'>View</p>
                <ArrowForwardIosIcon className='arrow_forward' style={{ color: '#7A2182' }} />
            </div>
            <span
              style={{
                width: '4px',
                color: '#7A2182'
              }}
            >|</span>
            <div className='project_delete'>
              <img src="/static/images/Grupo 132.png" alt="grupo" style={{
                  width: '20px',
                  height: '22px'
              }} />
            </div>
            
        </div>
    </div>
  )
}

export default ProjectContainer