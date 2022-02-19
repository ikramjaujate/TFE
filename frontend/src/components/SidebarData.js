import React from 'react'
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <RiIcons.RiLayoutGridLine/>,
        cName: 'nav-text'
    },
    {
        title: 'Clients',
        path: '/clients',
        icon: <AiIcons.AiOutlineUser/>,
        cName: 'nav-text'
    },
    {
        title: 'Projects',
        path: '/projects',
        icon: <RiIcons.RiBook2Fill/>,
        cName: 'nav-text'
    },
    {
        title: 'Invoices',
        path: '/invoices',
        icon: <RiIcons.RiDraftLine/>,
        cName: 'nav-text'
    },
    {
        title: 'Employees',
        path: '/employees',
        icon: <AiIcons.AiOutlineUsergroupAdd/>,
        cName: 'nav-text'
    },
    {
        title: 'Material',
        path: '/material',
        icon: <RiIcons.RiShoppingBasket2Line/>,
        cName: 'nav-text'
    },
]
