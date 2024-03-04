import React, { useState } from "react";
import Common from '../../Common';
import { Link, useNavigate } from "react-router-dom"; // import useNavigate
import { SIDEBAR_DATA as dummyData } from '../Data';
import { InputField } from "../common";
import { useForm } from "react-hook-form";
import axios from "axios";


function Posts() {
    
    return (
    <Common  dummyData={dummyData} > </Common>
    );
}

export default Posts;