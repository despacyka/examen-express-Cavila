const Express=require("express")
const Cors=require("cors")

const app=Express()
app.use(Cors())
app.use(Express.json())

// Tu código va desde aquí ⬇️



// Hasta aquí ⬇⬆️

module.exports={app}
