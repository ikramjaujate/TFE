import React from 'react'
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <RiIcons.RiLayoutGridLine style={{color: 'white'}}/>,
        cName: 'nav-text'
    },
    {
        title: 'Clients',
        path: '/clients',
        icon: <AiIcons.AiOutlineUser style={{color: 'white'}}/>,
        cName: 'nav-text'
    },
    {
        title: 'Projects',
        path: '/projects',
        icon: <RiIcons.RiBook2Fill style={{color: 'white'}}/>,
        cName: 'nav-text'
    },
    {
        title: 'Invoices',
        path: '/invoices',
        icon: <RiIcons.RiDraftLine style={{color: 'white'}}/>,
        cName: 'nav-text'
    },
    {
        title: 'Employees',
        path: '/employees',
        icon: <AiIcons.AiOutlineUsergroupAdd style={{color: 'white'}}/>,
        cName: 'nav-text'
    },
    {
        title: 'Material',
        path: '/material',
        icon: <RiIcons.RiShoppingBasket2Line style={{color: 'white'}}/>,
        cName: 'nav-text'
    },
]
