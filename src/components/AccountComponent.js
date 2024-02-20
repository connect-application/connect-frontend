import React, {useState, useEffect} from 'react'
import AccountService from '../services/AccountService';
import logo from './images/logo2.png';
import { Settings } from 'lucide-react';


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
        <div id = "colorPage" className="container">
            <h2 id="page" className="text-center"> Users List</h2>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th> User Name</th>
                        <th> User Email</th>
                    </tr>

                </thead>
                <tbody>
                    {users.map(
                        account => <tr key={account.id}>
                            <td> {account.name}</td>
                            <td> {account.email}</td>

                        </tr>

                    )}

                </tbody>


            </table>

        </div>
    )
}

export default AccountComponent