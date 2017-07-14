module.exports = pharmarcy;

function pharmarcy(app,request){
    //  http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyLcinfoInqire
    //
    
    var url = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyLcinfoInqire";
    url += "?ServiceKey"+"BIgnMcOt6Lmw%2FA9LPOyT40EBlmA1hkOm5ntiXi4od57UdwRvmrkK6p2B%2FG7YjxbGo%2FoPK67it2tisgdfLx0Y5g%3D%3D";
    url +=  '&' + encodeURIComponent('') + '=' + encodeURIComponent('');
    
    request({
        url:url,
        method:"GET"
    },(err,response,body)=>{
        console.log(body);
    })
}
