module.exports = push;

function push(app,FCM,userMedicModel){
    var serverKey = "AAAAYkqit2A:APA91bFnteQzo7DZtGtNMMz8UJBuW4U-lWJEiqmQ6MGckYVgFZoNpudXuzrzpEGd9_Y0azXN08HNphysrsTsTzPnLn3fDyjewh_Zkzm9pd13xC-5Y1D6EEIQ_ZStYzN447tRXrs0O4t7";

    var fcm =  new FCM(serverKey);

    app.get('/shangus',(req,res)=>{
        var token = req.query.token;
        var fcmToken = req.query.fcm;
        
        userMedicModel.find({"token":token},(err,model)=>{
            if(err) throw err;
            
        });

        var message = {
            to : fcmToken,
            priority:'high',
            notification:{
                title:,
                body:'노무현'
            }
        };

        fcm.send(message,(err,result)=>{
            if(err) console.log(error);
            else{
                console.log(result);
            }
        });
    });

}

