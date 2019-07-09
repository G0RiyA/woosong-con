# Item
## GET : /item/qrcheck
> Require
 ```
 qrdata - String
 QR코드 읽은 값
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
status - 404
message - "Data is not found"

등록되지 않은 QR data일 때 오류
```

## POST : /item/register

> require
```
itemname - String
daytime - String
getLocation - String
storageLocation -String
image - Image
```
>response : Success
```
status - 200
message - "Regster Success"
```
