module.exports = list;

function list(app,userMedicModel,eatModel,allergyModel){
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

    app.get('/list/eat/getTime',(req,res)=>{
        var token = req.query.token;

        eatModel.find({"token":token},(err,model)=>{
            if(err) throw err;
            res.send(model[0]);
        })
    });

    app.post('/list/eat/update',(req,res)=>{
        var token = req.body.token;
        var breakfirst = req.body.breakfirst;
        var lunch = req.body.lunch;
        var dinner = req.body.dinner;

        eatModel.find({"token":token},(err,model)=>{
            if(err) throw err;

            if(!breakfirst){
                breakfirst = model[0]["breakfirst"];
            }
            if(!lunch){
                lunch = model[0]["lunch"];
            }
            if(!dinner){
                dinner = model[0]["dinner"];
            }
        });

        eatModel.update({"token":token},{$set:{"breakfirst":breakfirst,"lunch":lunch,"dinner":dinner}},(err,model)=>{
            if(err) throw err;
            res.send(200);
        });
    });

    app.get('/list/allergy/getData',(req,res)=>{
        var token = req.query.token;
        allergyModel.find({"token":token},(err,model)=>{
            if(err) throw err;
            res.send(model[0]);
        });
    });

    app.post('/list/allergy/update',(req,res)=>{
        var token = req.body.token;
        var allergy = req.body.allergy;

        var allergyArr = new Array();

        allergyModel.find({"token":token},(err,model)=>{
            if(err) throw err;
            allergyArr = model[0]["list"];
        });

        var num = allergyArr.length + 1;
        allerygyArr[num] = allergy;

        allergyModel.update({"token":token},{$set:{"list":allergyArr}},(err,model)=>{
            if(err) throw err;
            res.send(200);
        });
    });
}
