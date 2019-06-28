# User
## POST : /user/login
> Require
```
id - String
유저 아이디

pw - String
유저 패스워드
```
> Response : Success
```
status - 200
data - {
	token - String
}
```
>Respons : Fail
```
status - 401
message - "Login Failed"
```

## POST : /user/register
> Require
```
id - String
유저 아이디
pw - String
유저 패스워드
email - String
유저 이메일
```
> Response : Success
```
status - 200
message - "Register Success"
```
> Response : Fail
```
status - 401
message - "User Already Exist"
``` 