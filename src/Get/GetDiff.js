import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import display from '../commponents/Display';

function GetDiff(){

    const {owner,repository,oid}=useParams();

    const curl=`https://api.github.com/repos/${owner}/${repository}/commits/${oid}`;

    var [diff, setGetDiff] = useState([]);
    var [days,setDays] = useState();
    var [parentid,setParentid] = useState();
    var [commitedby,setCommittedby] = useState();
    var [authorname,setAuthorname] = useState();
    var [authorphoto,setAuthorphoto] = useState();
    var [filename,setFilename] = useState([]);
    var [diff1, setGetDiff1] = useState([]);
    var [filename1,setFilename1] = useState([]);
    var psha;

    useEffect( () => {
        axios.get(curl)
        .then((json)=>{
            var currdate = new Date();
            setDays(Math.floor((currdate-Date.parse(json.data.commit.committer.date))/(1000*3600*24)));
            setAuthorname(json.data.commit.author.name);
            setCommittedby(json.data.commit.committer.name);
            psha = json.data.parents[0].sha;
            setParentid(json.data.parents[0].sha);
            setAuthorphoto(json.data.author.avatar_url);

            const durl = `https://api.github.com/repos/${owner}/${repository}/compare/${psha}...${oid}`;
            axios.get(durl)
            .then((res)=>{

                const span = document.createElement('span');
                span.innerHTML = '<button>butt</button>';
                const log = document.getElementById('eventlog');
                log.append(span);

                setGetDiff([...diff, { 
                    id : diff.length, 
                    value : res.data.files[0].patch
                }]);
                
                setFilename(res.data.files[0].filename);

                for(var i in res.data.files){
                    setGetDiff1(res.data.files[i].patch)            
                    setFilename1(res.data.files[i].filename);
                }
            })
        })
    },[curl,oid,owner,parentid,repository])
    
    return(
    <html>
        <header>
            <div className="left">

                <div className="left">
                    <img src={authorphoto} alt="Avatar" className="image">
                    </img>
                </div>

                <div className="left"><p className="header">Frame</p>
                    <p><span className="muted">Authored by </span><span className="body-text">{authorname}</span></p>
                </div>
                

            </div>

            <div className="right">
                <p><span className="muted">Commited by </span><span className="body">{commitedby} </span><span className="muted">{days} days ago</span></p>
                <p><span className="muted">Commit </span><span className="body">{oid}</span></p>
                <p><span className="muted">Parent </span><span className="Link-monospace">{parentid}</span></p>
            </div>

        </header>

        <body>

            <article>
                <div>
                <span id="eventlog"/>
                </div>

                <div>
                <button className="collapsible" key={diff.id} onClick={()=>display(0)}> {filename} </button>
                    <div className="content">
                    {diff.map(dif =>(
                        <p>{dif.value}</p>
                    ))}
                    </div>
                </div>

                <div>
                <button className="collapsible" onClick={()=>display(1)}> {filename1} </button>
                    <div className="content">
                    {diff1}
                    </div>
                </div>         

            </article>

        </body>

    </html>
    )
}

export default GetDiff