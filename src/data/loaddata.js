import React from "react";

export default async function loadData(){
  await fetch(process.env.REACT_APP_API + "team/getteams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: localStorage.getItem("uid"),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.projects.length > 0) {
        localStorage.setItem("teamList", JSON.stringify(data.projects));
        var team = data.projects;
         var teamid = localStorage.getItem("team");
         var teamdetails = team.filter((team) => team._id === teamid);
         localStorage.setItem("teamdetails", JSON.stringify(teamdetails));
         localStorage.setItem("loadComplete","1");
         localStorage.setItem("teamname", teamdetails[0].pname);
         var task = teamdetails[0].projecttasks;
         for (var i = 0; i < task.length; i++) {
           var progress = 0;
           for (var j = 0; j < task[i].taskdata.subTasks; j++) {
             if (task[i].taskdata.subtask[j].isDone) {
               progress += 1;
             }
           }
           task[i].progress = (progress / task[i].taskdata.subTasks) * 100;
           if (task[i].taskdata.subTasks === 0) {
             if (task[i].taskdata.isDone) {
               task[i].progress = 100;
             } else {
               task[i].progress = 0;
             }
           }
         }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}