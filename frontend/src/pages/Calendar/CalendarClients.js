import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { ListBox } from 'primereact/listbox';
import { GetProjectsByID } from '../../services/projects';
import moment from "moment";

import { GetProjectsByClientID } from '../../services/users';

const ClientProject = (dataClients, getProject) => {
    const [valueClient, setValueClient] = useState([])
    const [typeSelected, setTypeSelected] = useState('p')
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [ok, setOk] = useState(false)
    const [nameClient, setNameClient] = useState([])
    const [calendarEvent, setCalendarEvent] = useState([])
    const [userProjects, setUserProjects] = useState([])

    const getUserProjects = (value) => {

        setValueClient(value)

        GetProjectsByClientID(value.idPerson).then(response => {
            const projects = response['user']
            let calendarEvents = []
            projects.forEach(project => {
                project.start_date = moment(project.start_date).utc().format('YYYY-MM-DD')
                project.end_date = project.end_date ? moment(project.end_date).utc().format('YYYY-MM-DD') : moment(project.start_date).utc().format('YYYY-MM-DD')
                if(project.status == 'Canceled'){
                    return;
                }
                calendarEvents.push(
                    {
                        title: project.name,
                        start: project.start_date,
                        end: project.end_date,
                        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
                    }
                )
            })
            setCalendarEvent(calendarEvents)

        })

    }



    return (
        <>
            <div>
                <div className='col-12 md:col-3 ml-3 mt-2' >
        
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className='pi pi-search'></i>
                        </span>
                        <Dropdown value={valueClient} options={dataClients.dataClients} onChange={(e) => getUserProjects(e.value)} filter optionLabel="displayName" />
                    </div>

                </div>
                <div className='demo-app-main mx-4 p-1'>

                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        weekends={true}
                        eventColor={'#c9392f'}
                        events={calendarEvent}
                    />
                </div>
            </div>
        </>
    )
}
export default ClientProject