import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';

function GetCommits(){

    const {owner,repository,oid} = useParams();
    const url=`https://api.github.com/repos/${owner}/${repository}/commits/${oid}`;
    const [commits, setGetCommits] = useState([])

    useEffect( () => {
        axios.get(url)
            .then((json) => setGetCommits(json.data))
    },[url])

    return(
        <>
        
            <pre > {JSON.stringify(commits)} </pre>;
        </>
    )
}

export default GetCommits