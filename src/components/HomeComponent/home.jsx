import React, {useState, useEffect} from 'react'
import AccountService from '../../services/AccountService';
import Common from '../../Common';
import { SIDEBAR_DATA as dummyData } from '../Data';

function HomeComponent() {

    return (
        <Common  dummyData={dummyData} >
            <div id = "colorPage" className="container">
                <h2 id="page" className="text-center"> Home</h2>
            </div>
        </Common>
    )
}

export default HomeComponent