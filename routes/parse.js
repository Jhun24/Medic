module.exports = parse;

function parse(app,request,cheerio,medicModel,mModel){
    app.get('/parse/getData',(req,res)=>{
        var url = "http://terms.naver.com/medicineSearch.nhn?mode=nameSearch&query=";
        var medicNum = req.query.medicNum;
        var token = req.query.token;
        var resultUrl = url+medicNum;
        
        var medicineName;
        var medicineDisplayUrl;
        
        var division;
        var use;
        var notice;
        var save;
        var ingridient;

        medicModel.find({"number":medicNum},(err,model)=>{
            if(err) throw err;
            console.log(model[0]);
            if(model[0] == null){
                console.log("Save model");
                request(resultUrl,(err,response,html)=>{
                    if(err) throw err;

                    var splitName = html.split("<dt>");
                    var name = splitName[1].split("</a>");

                    medicineName = name[0].split("<strong>")[1].split("</strong>")[0];
                    var naverUrl = name[0].split("<a href=\"")[1].split("\">")[0];
                    medicineDisplayUrl = "http://terms.naver.com/"+naverUrl;

                    console.log(medicineDisplayUrl);

                    request(medicineDisplayUrl,(error,respon,code)=>{

                        if(error) throw error;

                        var test = code.split("<tr>");
                        division = test[2].split("</span>")[1].split("\">")[1].split("</td>")[0];
                        var setUse = test[5].split("<p class=\"txt\">");
                        use = setUse[5].split("<h3")[0];
                        use = use.replace("</p>","").replace(/<br>/gi,"\n");

                        var notice = setUse[6].split("<dl>")[0].split("</p>")[0].replace(/<br>/gi,"\n");
                        ingridient = setUse[2].split("</p>")[0];
                        save = setUse[3].split("</p>")[0];

                        var img = test[0].split("<img id=\"innerImage0\" class=\"lazyLoadImage\" src=\"http://static.naver.net/terms/terms/img/e.gif\" data-src=\"")[1].split("\"")[0];
                        var result = new Array();
                        result["name"] = medicineName;
                        result["number"] = medicNum;
                        result["division"] = division;
                        result["use"] = use;
                        result["notice"] = notice;
                        result["save"] = save;
                        result["ingridient"] = ingridient;
                        console.log(result);

                        var medicDataSave = new medicModel({
                            "name":result["name"],
                            "number":result["number"],
                            "division":result["division"],
                            "notice":result["notice"],
                            "ingridient":result["ingridient"],
                            "use":result["use"],
                            "saveMedicine":result["save"],
                            "img":img
                        });
                        console.log(test[2]);
                        medicDataSave.save((err,model)=>{
                            if(err) throw err;
                            console.log(model);
                            res.send(model);
                        });

                        mModel.find({"token":token},(err,model)=>{
                            if(err) throw err;
                            if(!model){
                                var numberNewArr = new Array();

                                var saveM = new mModel({"token":token,"number":numberNewArr})
                                    saveM.sav((error,m)=>{
                                    if(err) throw err;
                                    console.log("data save");
                                });
                            }
                            else{
                                var arrr = model[0]["number"];
                                var leng = arrr.length;
                                arrr[leng] = result["number"];

                                var saveM = new mModel({"token":token,"number":arrr});

                                saveM.save((error,m)=>{
                                    if(error) throw error;
                                    console.log("data save");
                                });
                            }
                        });
                    });
                });
            }
            else{
                console.log("Load Model")
                res.send(model[0]);
            }
        });
    });

    app.get('/parse/userData',(req,res)=>{
        var token = req.query.token;
        var arr = new Array();
        var length = 0;
        mModel.find({"token":token},(err,model)=>{
            if(err) throw err;
            for(var i = 0; i<model[0]["number"].length; i++){
                medicModel.find({"number":model[0]["number"]},(error,m)=>{
                    if(error) throw error;
                    arr[length] = m[0];
                    length++;
                });
            }

            res.send(arr);
        });
    });
}   
