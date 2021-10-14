import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

function GetDiff(){

    const {owner,repository,oid}=useParams();

    const curl=`https://api.github.com/repos/${owner}/${repository}/commits/${oid}`;

    var [diff, setGetDiff] = useState([]);
    var [days,setDays] = useState();
    var [parentid,setParentid] = useState();
    var [commitedby,setCommittedby] = useState();
    var [authorname,setAuthorname] = useState();
    var [authorphoto,setAuthorphoto] = useState();
    var psha;

    useEffect( () => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', curl, true);

            xhr.onload = function () {
                const data = JSON.parse(this.response);

                var currdate = new Date();
                setDays(Math.floor((currdate-Date.parse(data.commit.committer.date))/(1000*3600*24)));
                setAuthorname(data.commit.author.name);
                setCommittedby(data.commit.committer.name);
                psha = data.parents[0].sha;
                setParentid(data.parents[0].sha);
                setAuthorphoto(data.author.avatar_url);

                const durl = `https://api.github.com/repos/${owner}/${repository}/compare/${psha}...${oid}`;

                var dxhr = new XMLHttpRequest();
                dxhr.open('GET', durl, true);

                dxhr.onload = function () {
                    const diffdata = JSON.parse(this.response);
                    
                    // for(var i in diffdata.files){
                    setGetDiff(diffdata.files[0].patch);
                    // }
        
                };
                dxhr.send();
            };
            xhr.send();
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
                <button className="collapsible" onClick={()=>display()}>load Diff </button>
                    <div class="content">
                    {diff}
                    </div>
                </div>
            </article>
        </body>

    </html>
    )
}

function display(){
    var coll = document.getElementsByClassName("collapsible");
    coll[0].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
        content.style.display = "none";
        } else {
        content.style.display = "block";
        }
    });
}
export default GetDiff