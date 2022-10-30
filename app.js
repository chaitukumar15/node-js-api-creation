
const Joi = require("joi")
let express=require("express");
const { join } = require("path");
let app=express();
app.use(express.json());

const bikesData=[
    {
        id:1,
        bikeName:"rc350",
        cost:10000
    },
    {
        id:2,
        bikeName:"continental",
        cost:15000
    }
    
    ];
    
 
app.get("/api/royalEnfield/bikes",(req,res)=>{
res.send(bikesData)

});

app.get("/api/royalEnfield/bikes/:id",(req,res)=>{
   
     let bikes = bikesData.find(c=>c.id === parseInt(req.params.id));
    //  404 if proper data is not found
     if(!bikes) return res.status(404).send("the bike id did not found");

    res.send(bikes);
});

app.post("/api/royalEnfield/bikes",(req,res)=>{
    // general method
    // if(!req.body.bikeName && !res.body.cost ){
    //     res.status(400).send("bikeName and cost should not be empty ");
    //     return;
    // }
    // validation using joi
    const schema = Joi.object({
        bikeName:Joi.string().required(),
        cost:Joi.required()
       
    });
    const { error } = schema.validate(req.body);
// 400 bad request data not send properly
if(error ) return  res.status(400).send(error.details[0].message);
        
 


    const bike ={
        id:bikesData.length+1,
        bikeName:req.body.bikeName,
        cost:req.body.cost
    };
    bikesData.push(bike)
    res.send(bikesData)
})


app.put("/api/royalEnfield/bikes/:id",(req,res)=>{
// 404 dta not exist if wrong param is given 
let bikes = bikesData.find(c=>c.id === parseInt(req.params.id));
   
     if(!bikes) return  res.status(404).send("the bike id did not found");

// 400 bad request data not send properly
const schema = Joi.object({
        bikeName:Joi.string().required(),
        cost:Joi.required()
       
    });
    const { error } = schema.validate(req.body);

if(error ) return  res.status(400).send(error.details[0].message);
        
   

    bikes.bikeName=req.body.bikeName;
    bikes.cost=req.body.cost;
    res.send(bikes)

});

app.delete("/api/royalEnfield/bikes/:id",(req,res)=>{
// check weather id param exists(404)
let bikes = bikesData.find(c=>c.id === parseInt(req.params.id));
   
     if(!bikes) return res.status(404).send("the bike id did not found");

// find index of bikeData to splice that
let index =bikesData.indexOf(bikes);
bikesData.splice(index,1);
res.send(bikesData)

});

let port = process.env.PORT||3000;
app.listen(port)


// without a expressJs
// let http =require("http");
// let server=http.createServer((req,res)=>{
// if(req.url==="/app"){
//     res.write("hello");
//     res.end("chaitanya");
// }
// });
// // let port = process.env.PORT||3000;
// server.listen(3000)
