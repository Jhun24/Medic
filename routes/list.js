module.exports = list;

function list(app,userMedicModel){
    app.get('/list',(req,res)=>{
        var token = req.query.token;

        userMedicModel.find({"token":token},(err,model)=>{
            if(err) throw err;

            res.send(model);
        });
    });

    app.post('/list/add',(req,res)=>{
        var token = req.body.token;
        var name = req.body.name;
        var time = req.body.time;

        var modelName;
        var modelTime;

        userMedicModel.find({"token":token},(err,model)=>{
            if(err) throw err;
            modelName = model[0]["time"];
            modelName.push(name);
            modleTime = model[0]["name"];
            modelTime.push(time);
        });

        userMedicModel.update({"token":token},{$set:{"name":modelName,"time":modelTime}},(err,model)=>{
            if(err) throw err;
            res.send(200);
        });

    });
}
