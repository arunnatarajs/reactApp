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
                //const durl=`https://api.github.com/repos/${owner}/${repository}/commits/${psha}`;
                const durl = `https://api.github.com/repos/${owner}/${repository}/compare/${psha}...${oid}`;

                var dxhr = new XMLHttpRequest();
                dxhr.open('GET', durl, true);

                dxhr.onload = function () {
                    const da = JSON.parse(this.response);
                    console.log(da.files[1].patch)
                    setGetDiff(da.files[1].patch);
                };
                dxhr.send();
            };
            xhr.send();
        },[curl])
    
    return(
        <pre className="blob-code blob-code-d"> {diff} </pre>
    )
}

export default GetDiff