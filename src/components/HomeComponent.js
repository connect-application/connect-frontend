import React, {useState, useEffect} from 'react'
import AccountService from '../services/AccountService';

function HomeComponent() {

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
        <div className = "container">
            CONNECT
        </div>
    )
}

export default HomeComponent