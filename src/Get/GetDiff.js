import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

function GetDiff(){

    const {owner,repository,oid}=useParams();
    const curl=`https://api.github.com/repos/${owner}/${repository}/commits/${oid}`;
    const [diff, setGetDiff] = useState([]);
    useEffect( () => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', curl, true);

            xhr.onload = function () {
                const data = JSON.parse(this.response);
                var psha = data.parents[0].sha; //parent sha
                //const durl=`https://api.github.com/repos/${owner}/${repository}/commits/${oid}`;
                const durl = `https://github.com/${owner}/${repository}/compare/${psha}...${oid}.diff`;

                var dxhr = new XMLHttpRequest();
                dxhr.open('GET', durl, true);

                dxhr.onload = function () {
                    setGetDiff(this.response);
                };
                dxhr.send();
            };
            xhr.send();
        },[curl])
    
    return(
        <pre> {diff} </pre>
    )
}

export default GetDiff