import React, {useState, useEffect} from 'react'
import AccountService from '../services/AccountService';
import logo from './images/logo2.png';
import { Settings } from 'lucide-react';
import Common from '../Common';
import { SIDEBAR_DATA as dummyData } from './Data.js'; // Assuming you have sidebar data


function AccountComponent() {

    const [users, setUser] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers= () => {

        AccountService.getUsers().then((response) => {
            setUser(response.data)
            console.log(response.data);
        });
    };

    return (
        <Common  dummyData={dummyData} > <div id="colorPage"></div></Common>
    )
}

export default AccountComponent