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
        <div id = "colorPage" className="container">
            <h2 id="page" className="text-center"> Home</h2>
        </div>
    )
}

export default HomeComponent