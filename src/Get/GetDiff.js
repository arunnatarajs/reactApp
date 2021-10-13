import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

function GetDiff(){

    const {owner,repository,oid}=useParams();
    const curl=`https://api.github.com/repos/${owner}/${repository}/commits/${oid}`;
    const [diff, setGetDiff] = useState([]);
    const [parent, setParent] = useState([]);
    const [date, setDate] = useState([]);
    const [user, setUser] = useState([]);

    useEffect( () => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', curl, true);

            xhr.onload = function () {
                const data = JSON.parse(this.response);
                var psha = data.parents[0].sha; //parent sha
                setParent(data.parents[0].sha)
                setUser(data.commit.author.name)
                setDate(data.commit.author.date)
                //const durl=`https://api.github.com/repos/${owner}/${repository}/commits/${psha}`;
                const durl = `https://api.github.com/repos/${owner}/${repository}/compare/${psha}...${oid}`;

                var dxhr = new XMLHttpRequest();
                dxhr.open('GET', durl, true);

                dxhr.onload = function () {
                    const diffdata = JSON.parse(this.response);
                
                    for(let i in diffdata.files)
                    {
                        setGetDiff(diffdata.files[i].patch);
                    }
                };
                dxhr.send();
            };
            xhr.send();
        },[curl])
    
    return(
        <><pre className="blob-code"> {diff} </pre>
        <p> {parent} </p>
        <p> {date} </p>
        <p> {user} </p>
        </>
    )
}

export default GetDiff