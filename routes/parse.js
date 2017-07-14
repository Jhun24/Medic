module.exports = parse;

function parse(app,request,cheerio,medicModel){
    app.get('/getData',(req,res)=>{
        var url = "http://terms.naver.com/medicineSearch.nhn?mode=nameSearch&query=";
        var medicNum = "642101930";
    
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

            if(!model){
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

                        division = test[2].split("</span>")[1];
                        var setUse = test[5].split("<p class=\"txt\">");
                        use = setUse[5].split("<h3")[0];
                        use = use.replace("</p>","").replace(/<br>/gi,"\n");

                        var notice = setUse[6].split("<dl>")[0].split("</p>")[0].replace(/<br>/gi,"\n");
                        ingridient = setUse[2].split("</p>")[0];
                        save = setUse[3].split("</p>")[0];


                        var result = new Array();
                        result["name"] = medicineName;
                        result["number"] = medicNum;
                        result["division"] = division;
                        result["use"] = use;
                        result["notice"] = notice;
                        result["save"] = save;
                        result["ingridient"] = ingridient;
                        console.log(result);
                        res.send(result);
                    });
                });
            }
            else{
                res.send(model[0]);
            }
        });
    });
}
