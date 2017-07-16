module.exports = push;

function push(app,FCM,userMedicModel){
    var serverKey = "AAAAYkqit2A:APA91bFnteQzo7DZtGtNMMz8UJBuW4U-lWJEiqmQ6MGckYVgFZoNpudXuzrzpEGd9_Y0azXN08HNphysrsTsTzPnLn3fDyjewh_Zkzm9pd13xC-5Y1D6EEIQ_ZStYzN447tRXrs0O4t7";

    var fcm =  new FCM(serverKey);

    app.get('/shangus',(req,res)=>{
        var token = req.query.token;
        var fcmToken = req.query.fcm;

        var d = new Date();
        var time = d.getDate();

        var fcmSendName = "";

        userMedicModel.find({"token":token},(err,model)=>{
            if(err) throw err;
            var arr = model[0]["time"];
            for(var i = 0; i<arr.length; i++){
                if(arr[i] == time){
                    fcmSendName = model[0]["name"][i];
                }
            }
        });

        var fcmTitle = fcmSendName+" 먹을시간입니다!";

        var message = {
            to : fcmToken,
            priority:'high',
            notification:{
                title:"약 먹을시간입니다!",
                body:fcmTitle
            }
        };

        fcm.send(message,(err,result)=>{
            if(err) console.log(error);
            else{
                console.log("fcm send success  :  "+result);
            }
        });
    });

}

