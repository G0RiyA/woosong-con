# Item
## GET : /item/qrcheck
> Require
 ```
 token - String
 qrdata - String
 QR코드 읽은 값

로그인이 되어있어야만 가능합니다
 ```

>Response : Success
```
status - 200
data - {
	station - String : 역 이름
}
```

>Response : Fail
```
status - 401
message - "Unauthorize token"
```

>Response : Fail
```
status - 404
message - "Data is not found"

등록되지 않은 QR data일 때 오류
```

## POST : /item/register

> require
```
token - String
itemname - String
datetime - String
getLocation - String
storageLocation -String
image - Image
```
>response : Success
```
status - 200
message - "Regster Success"
```
>response : Fail
```
status  - 401
message - Unauthorize token'
```