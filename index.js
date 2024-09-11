const express=require("express");
const app=express();


var users=[ 
  {user:"Abhishek",kidneys:[{kidney:false},{kidney:true}]},
  {user:"Adyasha",kidneys:[{kidney:true},{kidney:true}]},
  {user:"Rakhi",kidneys:[{kidney:true},{kidney:false}]},
  {user:"Alkanada",kidneys:[{kidney:true},{kidney:false}]},
  {user:"Deepesh",kidneys:[{kidney:true},{kidney:true}]},
]
app.get("/",function(req,res){
  const Userdata=parseInt(req.query.n);
  var HealthyKidneys=0;
  if (isNaN(Userdata) || Userdata < 0 || Userdata >= users.length) {
         return res.status(400).json({ error: "Invalid user index" });
    }
  for(let i=0;i<users[Userdata].kidneys.length;i++)
  {
    if(users[Userdata].kidneys[i].kidney===true)
    {
      HealthyKidneys=HealthyKidneys+1;
    }
  }
  const BadKidney=users[Userdata].kidneys.length-HealthyKidneys;
  res.json({
    user: users[Userdata].user,
    HealthyKidneys,
    BadKidney
  });
});
app.use(express.json());
app.post("/",function(req,res)
{
  const addNew=req.body.addNew;
  users[0].kidneys.push(
    {
      kidney:addNew
    }

  )
  res.json(
    {
      msg:"done"
    }
  )
})

app.put("/",function(req,res)
  {
     for(let i=0;i<users[0].kidneys.length;i++)
     {
      users[0].kidneys[i].kidney=true;
     }
     res.json(
      {}
    )
  }
)

//updates   
app.delete("/",function(req,res)
  { var newkidney=[];
     for(let i=0;i<users[0].kidneys.length;i++)
     {
    if(users[0].kidneys[i]==false)
    {
      newkidney.push(true)
    }
     }
     users[0].kidneys=newkidney;

     res.json(
      {}
    )
  }
)
app.listen(3000,()=>
{console.log("server running in port 3000")});

