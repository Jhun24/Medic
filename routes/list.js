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

        var userMedicSaveModel = new userMedicModel({"token":token,"name":name,"time":time},(err,model)=>{
            if(err) throw err;
            res.send(200);
        });
    });
}
