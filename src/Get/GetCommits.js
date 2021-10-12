import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

function GetCommits(){

    const {owner,repository,oid} = useParams();
    const url=`https://api.github.com/repos/${owner}/${repository}/commits/${oid}`;
    const [commits, setGetCommits] = useState([])

    useEffect( () => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function () {
            setGetCommits(this.response)
        }
        xhr.send()

    },[url])

    return(
        <pre> {commits} </pre>
    )
}

export default GetCommits