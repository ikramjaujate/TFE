import './Calendar.css'

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { ListBox } from 'primereact/listbox';
import { Dropdown } from 'primereact/dropdown';
import { GetClientsWithProjects } from '../../services/users';
import { GetProjects } from '../../services/projects';

import ClientProject from './CalendarClients';
const CalendarClient = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState([]);
  const [persons, setPersons] = useState([]);
  const [companies, setCompanies] = useState([]);

  const getPersons = () => {
    setLoading(true);
    GetClientsWithProjects().then(response => {
      setPersons(response["simpleUsers"]);
    });
  }
  useEffect(() => {
    persons.forEach(person => {
      data.push({
        idPerson: person.idPerson,
        type: 'p',
        displayName: `${person.firstName} ${person.lastName}`
      });
    });
    setData([...data]);
    setLoading(false);
  }, [persons])
  useEffect(() => {
    // on page changes
    getPersons();
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