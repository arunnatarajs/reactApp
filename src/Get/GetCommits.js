import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

function GetCommits(){

    const {owner,repository,oid}=useParams();
    const curl=`https://api.github.com/repos/${owner}/${repository}/commits/${oid}`;
    const [commits, setGetCommits] = useState(null)

    useEffect( () => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', curl, true);

        xhr.onload = function () {
            setGetCommits(this.response)
        }
        xhr.send()

    },[curl])

    return(
        <pre> {commits} </pre>
    )
}

export default GetCommits