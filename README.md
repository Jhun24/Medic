# API KEY
> 7DoqSSQQNky%2FdI0zkWLjvLUjVGKoz8BC2GSyJLjvdZbpKMFMkqDj4ZnoweDjcSU4B5P7iCqMaYpKVZ5kr6YBNw%3D%3D
 

# Schema
- User
> name : String

> id : String

> password : String

> age : String

> sex : String

> token : String

- medicine

> number : String

> name : String

> saveMedicine : String

> division : String

> ingridient : String

> use : String

- userMedicineList
> token : String

> time : Array

> name : Array

- eat
> token : String

> breakfirst : String,

> launch : String,

> dinner : String

- allergy
> token : String

> list : Array

# Query :GET
- /list?token="user-token"
>> Param

> token : 유저 토큰을 의미합니다

>> require

> UserMedicList Model : 유저 약 정보가 담긴 Arr를 리턴합니다

> model["token"] : 유저토큰

> model["name"] : 약 이름 Array

> model["time"] : 약을 먹을 시간 Array

- /parse/getData?medicNum="medic-number"
>> Param

> medicNum : 약 코드를 의미합니다

>> require

> reuslt Array
> result["name"] : 약 이름

> result["number"] : 약 코드

> result["division"] : 전문 의약품 or 일반 의약품

> result["use"] : 사용 방법

> result["notice"] : 주의 사항

> result["save"] : 저장 용기

> result["ingridient"] : 약 재료

- /pharmacy/check?w="위도"&h="경도"
>> param

> w : 위도

> h : 경도

>> require

> model array : 주변 정보

- /push/shangus?token="user token"&fcm="user firebase key"
>> param
> token : 유저 토큰

> fcm : 유저 firebase 토큰

>> require
> 현재 시간에 맞는 약 알람

- /list/eat/getData?token="user token"
>> param
> token : 유저 토큰

>> require

> model["breakfirst"] : 아침

> model["lunch"] : 점심

> model["dinner"] : 저녁

- /list/allergy/getData?token="user token"
>> param

> token : 유저 토큰

>> require

> list Array : 사용자 알러지 목록

# Query :POST
- /auth/login
>> Param

> id : 유저 아이디를 의미합니다

> ps : 유저 패스워드를 의미합니다


>> require

> token : 유저 토큰을 의미합니다

- /auth/signup
>> Param

> id : 유저 아이디를 의미합니다

> ps : 유저 패스워드를 의미합니다

> name : 유저 이름을 의미합니다

> age : 유저 나이를 의미합니다

> sex : 유저 성별을 의미합니

>> require

> token : 유저 토큰을 의미합니다

- /auth/login/authenticate
>> param

> token : 유조 토큰을 의미합니다

>> request
> model :  유저 전체 데이터

- /list/add
>> Param

> token : 유저 토큰을 의미합니다

> time : 약 먹을 시간을 의미합니다

> name : 약 이름을 의미합니다

>> require

> Server code : 200

- /auth/setAge
>> Param

> token : 유저 데이터를 의미합니다

> age : 유저 나의를 의미합니다

>> require

> server code 200

- list/eat/update
>> param

> token : user token

> breakfirst(필수 아님) :  유저 아침 식사 시간

> lunch(필수 아님) : 유저 점심 식사 시간

> dinner(필수 아님) : 유저 저녁 식사 시간

> breakfirst , lunch , dinner 중 하나는 필수

>> require

> server code 200

- /list/allergy/update
>> param

> token : user token

> allergy : 추가할 사용자 알러지

>> require

> server code 200
