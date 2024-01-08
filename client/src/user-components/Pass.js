import axios from "axios";
import React, { useEffect, useState } from "react";

function Pass(props) {
    const { email } = props;
    const [applyData, setApplyData] = useState([])
    const [profile, setProfile] = useState()

    useEffect(() => {

        axios.get(`https://project-wmxw.onrender.com/getImage/${email}`)
            .then((res) => {
                setProfile(res.data.imageurl)
                console.log("Iam image", profile)
            })
            .catch((err) => console.log(err));
        axios
            .get("https://project-wmxw.onrender.com/application_mails")
            .then((res) => {
                setApplyData(res.data);
                console.log("I am apply data",applyData);
            })
            .catch((err) => console.log(err));
    }, [])

    return (
        <div >
                hello
        </div>
    );
}

export default Pass;
