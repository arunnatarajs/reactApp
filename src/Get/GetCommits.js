import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';

function GetCommits(){

    const {owner,repository,oid}=useParams();
    const url=`https://api.github.com/repos/${owner}/${repository}/commits/${oid}`;

    var [commits, setGetCommits] = useState([]);
    var [days,setDays] = useState();
    var [parentid,setParentid] = useState();
    var [commitedby,setCommittedby] = useState();
    var [authorname,setAuthorname] = useState();
    var [authorphoto,setAuthorphoto] = useState();
    var psha;

    useEffect( () => {
        axios.get(url)
        .then((json)=>{
            var currdate = new Date();
            setDays(Math.floor((currdate-Date.parse(json.data.commit.committer.date))/(1000*3600*24)));
            setAuthorname(json.data.commit.author.name);
            setCommittedby(json.data.commit.committer.name);
            psha = json.data.parents[0].sha;
            setParentid(json.data.parents[0].sha);
            setAuthorphoto(json.data.author.avatar_url);
            setGetCommits(json.data);
        })
    },[url,oid,owner,parentid,repository])

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
                <pre>
                    {JSON.stringify(commits)}
                </pre>
            </article>
            
        </body>

    </html>
    )
}

export default GetCommits