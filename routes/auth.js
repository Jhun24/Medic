module.exports = auth;
function auth(app,userModel,randomstring){
    app.post('/auth/login',(req,res)=>{
        var id = req.body.id;
        var ps = req.body.ps;

        userModel.find({"id":id,"ps":ps},(err,model)=>{
            if(err) throw err;
            res.send(model[0]["token"]);
        });
    });

    app.post('/auth/signup',(req,res)=>{
        var id = req.body.id;
        var ps = req.body.ps;
        var name = req.body.name;
        var sex = req.body.sex;
        var age = req.body.age;
        var token = randomstring.generate();
        
        var userSaveModel = new userModel({
            "id":id,
            "password":ps,
            "name":name,
            "sex":sex,
            "age":age,
            "token":token
        });

        userSaveModle.save((err,model)=>{
            if(err) throw err;
            res.send(token);
        })
    });

    app.get('/auth/login/authenticate',(req.res)=>{
        var token = req.query.token;

        userModel.find({"token":token},(err,model)=>{
            if(err) throw err;
            res.send(model[0]);
        });
    });

    app.post('/auth/setAge',(req,res)=>{
        var token = req.body.token;
        var age = req.body.age;

        userModel.update({"token":token},{$set:{"age":age}},(err,model=>{
            if(err) throw err;
            res.send(200);
        });
    });
}
