# Auth
## POST : /auth/verification
> require
```
phone - String
전화번호입니다
```
> Response : Success
```
status - 200
message - "Success"
```

## POST : /auth/check
> require
```
phone - String
code - String
인증번호입니다
```
> Response : Success
```
status - 200
message - "1"
```
> Response : Fail
```
status - 401
message - "0"
이미 만료된 인증번호이거나 잘못된 인증번호를 입력했을 경우 발생합니다
``` 
