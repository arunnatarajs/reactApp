import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

function GetDiff(){

    const {owner,repository,oid}=useParams();

    const curl=`https://api.github.com/repos/${owner}/${repository}/commits/${oid}`;

    var [days,setDays] = useState();
    var [parentid,setParentid] = useState();
    var [commitedby,setCommittedby] = useState();
    var [authorname,setAuthorname] = useState();
    var [authorphoto,setAuthorphoto] = useState();
    var [files, setFiles] = useState([]);
    var [filename,setFilename] = useState([]);
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
                for(var i in res.data.files){
                    files.push(res.data.files[i].patch.split("\n"));
                    filename.push(res.data.files[i].filename);
                }
            })

            .catch((e)=>{
                console.log("no patch found");
            })
        })
    },[curl,oid,owner,parentid,repository])

    console.log(files)
    
    return(
    <html class ="center">
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
                    {files.map((file,index) =>(
                         <><button type="button" class="collapsiblelink" onClick={() => display(index)}>{filename[index]}</button><div class="content">
                            
                            {file.map(name => (
                            
                                <li>
                                    {name}
                                </li>

                            ))}
                        </div></>
                    ))}

                </div>
            </article>
        </body>

    </html>
    )
}

var coll = document.getElementsByClassName("collapsiblelink");

function display(i) {
  coll[i].addEventListener("click", function() {
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