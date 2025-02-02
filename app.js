const Express=require("express")
const Cors=require("cors")

const app=Express()
app.use(Cors())
app.use(Express.json())

// Tu código va desde aquí ⬇️

app.get("/",(req,res)=>{
  return res.status(200).send("OK")
})

// Hasta aquí ⬇⬆️

module.exports={app}