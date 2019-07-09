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
description - String
```
>response : Success
```
status - 200
message - "Register Success"
```

## GET : /item/list

> require
```
None
```
> response : Success
```
status - 200
data - {
  list - List : 분실물 전체 리스트를 리스트 형식으로 전달
}
```

## GET : /item/search

> require
```
query - String
```
> response : Success
```
status - 200
data - {
  list - List : 검색 결과를 리스트 형식으로 전달
}
```

## GET : /item/reserve

> require
```
no - Int
분실물의 고유 번호입니다
owner - String
예약한 사람의 전화번호입니다
```
> response : Success
```
status - 200
data - {
  phone - String : Owner의 전화번호입니다.
}
```
