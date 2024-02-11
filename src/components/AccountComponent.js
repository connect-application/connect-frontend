import React, {useState, useEffect} from 'react'
import AccountService from '../services/AccountService';
import logo from './images/logo1.png';
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
    
    function SideMenu() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light">

            <img src={logo} alt="Test"></img>           
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">

            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <span class="navbar-text"> <Settings color= "black" size={30}/>
            </span>
            </div>
            </nav>
            );
    }

    return (
        <><div> <SideMenu /></div><div className="container">
            <h1 className="text-center"> Users List</h1>

            <table id = "table1" className="table table-striped">
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

        </div></>
    )
}

export default AccountComponent