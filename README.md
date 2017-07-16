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

- /list/add
>> Param

> token : 유저 토큰을 의미합니다

> time : 약 먹을 시간을 의미합니다

> name : 약 이름을 의미합니다

>> require
> Server code : 200
