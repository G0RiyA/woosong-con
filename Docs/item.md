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
  {
    no - Int : 물품의 고유 번호
    itemname - String : 물품의 이름
    daytime - String : 물건을 습득한 시각
    getLocation - String : 물건을 습득한 위치
    storageLocation - String : 물건을 보관 중인 역
    imagePath - String : 물건의 사진이 저장된 경로
    description - String : 물건에 대한 설명
  }
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
  {
    no - Int : 물품의 고유 번호
    itemname - String : 물품의 이름
    daytime - String : 물건을 습득한 시각
    getLocation - String : 물건을 습득한 위치
    storageLocation - String : 물건을 보관 중인 역
    imagePath - String : 물건의 사진이 저장된 경로
    description - String : 물건에 대한 설명
  }
}
```

## GET : /item/reserve

> require
```
no - Int
분실물의 고유 번호입니다
owner - String
예약한 사람의 전화번호입니다
comment - String
예약한 사람이 남긴 말 입니다
```
> response : Success
```
status - 200
data - {
  phone - String : Owner의 전화번호입니다.
}
```

> response : Fail
```
status - 404
messaeg - Not found
등록되지 않은 물품의 번호일 때 발생합니다
```

## GET : /item/myreserve

> require
```
owner - String
예약한 사람의 전화번호입니다
```
> response : Success
```
status - 200
data - {
  list - List : 찾은 결과의 리스트입니다.
  {
    no - Int : 물품의 고유 번호
    itemname - String : 물품의 이름
    daytime - String : 물건을 습득한 시각
    getLocation - String : 물건을 습득한 위치
    storageLocation - String : 물건을 보관 중인 역
    imagePath - String : 물건의 사진이 저장된 경로
    description - String : 물건에 대한 설명
    owner - String : 물건을 예약한 사람의 전화번호
    comment - String : 물건을 예약한 사람이 남긴 코멘트
  }
}
