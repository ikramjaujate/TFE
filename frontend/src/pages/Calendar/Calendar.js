import './Calendar.css'

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { ListBox } from 'primereact/listbox';
import { Dropdown } from 'primereact/dropdown';

import { GetProjects } from '../../services/projects';

import ClientProject from './CalendarClients';
const CalendarClient = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState([]);
  
  const getProjects = () => {
    setLoading(true);
    GetProjects().then(response => {
      setProjects(response["projects"]);
    });
  }
  useEffect(() => {
    projects.forEach(project => {
     
      if (project.idCompany == null) {
        if(project.end_date != null){
          project.end_date = moment(project.end_date).utc().format('YYYY-MM-DD')
        }
        data.push({
          id: project.idProject,
          idPerson: project.Person.idPerson,
          idCompany: null,
          displayName: `${project.Person.firstName} ${project.Person.lastName}`,
          type: 'p',
          name: `${project.name}`,
          status: project.status,
          start_date: moment(project.start_date).utc().format('YYYY-MM-DD'),
          end_date: project.end_date,
          mobile: project.Person.mobile,
          VAT_num: project.Person.VAT_num
        })
      }
      else {
       
        if(project.end_date != null){
          project.end_date = moment(project.end_date).utc().format('YYYY-MM-DD')
        }
        data.push({
          id: project.idProject,
          idPerson: null,
          idCompany: project.Company.idCompany,
          displayName: `${project.Company.name}`,
          type: 'c',
          name: `${project.name}`,
          status: project.status,
          start_date: moment(project.start_date).utc().format('YYYY-MM-DD'),
          end_date: project.end_date ,
          mobile: project.Company.mobile,
          VAT_num: project.Company.VAT_num
        })
      }
    });
    setData([...data]);
    

    setLoading(false);
  }, [projects])

  useEffect(() => {
    // on page changes
    getProjects();
   
  }, [])
  
  return (
    <>
      <div className="title">
        <h1> Calendar
        </h1>
      </div>
      <ClientProject dataClients={data} />
      </>
    
  )
}
export default CalendarClient