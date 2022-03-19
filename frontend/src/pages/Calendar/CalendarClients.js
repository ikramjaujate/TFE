import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { ListBox } from 'primereact/listbox';
import { GetProjectsByID } from '../../services/projects';
import moment from "moment";

const ClientProject = (dataClients, getProject) => {
  const [valueClient, setValueClient] = useState([])
  const [typeSelected, setTypeSelected] = useState('p')
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ok, setOk] = useState(false)
  const[nameClient, setNameClient]= useState([])
  const [calendarEvent, setCalendarEvent] = useState([])
  
  const getProjectsByID = (value) => {
    setValueClient(value)
    
    GetProjectsByID(value.idProject).then(response => {
      setName(response['project'][0].name)
      setStartDate(moment(response['project'][0].start_date).utc().format('YYYY-MM-DD'))
      setEndDate(response['project'][0].end_date ? moment(response['project'][0].end_date).utc().format('YYYY-MM-DD') : moment(response['project'][0].start_date).utc().format('YYYY-MM-DD'))
    })
    
  }

  useEffect(() =>{
    for(const client of dataClients.dataClients){
      
      if(client.type == 'p'){
        nameClient.push({ 'name': client.displayName, 'idProject' : client.id })
      }else{
        nameClient.push({ 'name': client.displayName, 'idProject' : client.id })
      }
    }
    setOk(false)
  }, [dataClients])

  useEffect(() =>{

    setCalendarEvent([
      { title: name,
        start: startDate,
        end: endDate
      }
    ])
    console.log(endDate)
  }, [endDate])
  return (
    <>
      <div>

        <Dropdown value={valueClient} options={nameClient} onChange={(e) => getProjectsByID(e.value)} filter optionLabel="name" />
        <div className='demo-app-main'>
      
          <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            weekends={false}
            eventColor={'#c9392f'}
            events={calendarEvent}
          />
        </div>
      </div>
    </>
  )
}
export default ClientProject