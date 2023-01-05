import React from 'react'

import homeIcon from '/static/images/home-icon.png'
import seetingsIcon from '/static/images/seetings-icon.png'
import loogoutIcon from '/static/images/loogout-icon.png'
import { useAuth } from 'hooks/useAuth'


const Nav = ({
    userName,
    setView,
    view,
    setClient,
    setLob,
    setStartDate,
    setEndDate,
}) => {

    
	const { logOut } = useAuth();

    const handleHome = () => {
        const returnHome = window.confirm('Are you sure you want to return to the home screen and lose the current filters?');

        if (returnHome) {
            setView(1);
            setClient('');
            sessionStorage.removeItem( 'client' );
            sessionStorage.removeItem( 'Lob' );
            sessionStorage.removeItem( 'startDate' );
            sessionStorage.removeItem( 'endDate' );
            setLob('');
            setStartDate('');
            setEndDate('');

            return;
        }

        return;
    }


  return (
    <nav className='d-flex justify-content-between align-items-center mb-4'>
        <div>
            <p className='m-0 nav_brand'>
                <span className='fw-bold'>TP</span>improve
            </p>
        </div>
        {
            view !== 1 && ( 
                <div className='d-flex flex-column align-items-center' style={{
                    color: '#db2388'
                }}>
                    <p className='m-0 fw-bold'> Project Name</p>
                    <p className='m-0'>123456</p>
                </div>
            )
        }
        <div className='d-flex gap-3 align-items-center justify-content-center'>
            <div className='profile_img'>

            </div>
            <p className='m-0 userName_text'>
                Hello, <span className='fw-bold'>{userName}</span>
            </p>
            <div
                onClick={handleHome}
            >
                <img src="/static/images/home-icon.png" alt="arrow_down" className='img_navbar' />
            </div>
            {/* <div>
                <img src="/static/images/seetings-icon.png" alt="arrow_down" className='img_navbar' />
            </div> */}
            <div>
                <img src="/static/images/loogout-icon.png" alt="arrow_down" className='img_navbar' onClick={logOut} />
            </div>
        </div>
    </nav>
  )
}

export default Nav