# Admin
## GET : /admin/items
> Require
```
station - String
리스트를 불러오고 싶은 역
```

> Response : Success
```
status - 200
data - {
  queue - 아직 승인되지 않은 물품들의 목록
  {
    no - Int : 물품의 고유 번호
    itemname - String : 물품의 이름
    daytime - String : 물건을 습득한 시각
    getLocation - String : 물건을 습득한 위치
    storageLocation - String : 물건을 보관 중인 역
    imagePath - String : 물건의 사진이 저장된 경로
    description - String : 물건에 대한 설명
  }

  items - 승인이 완료된 물품들의 목록
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

> Response : Fail
```
status - 400
message - Bad request
station 정보를 주지 않았을 때 발생
```

## GET : /admin/reservation
> Require
```
None
```

> Response : Success
```
status - 200
data - {
  reservations - 예약된 물품들의 리스트
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
```

## POST : /admin/approval
> Require
```
no - Int
승인할 물품의 번호
```

> Response : Success
```
status - 200
message - Success
```

> Response : Fail
```
status - 404
message - Item not found
no에 해당하는 아이템을 찾을 수 없으면 발생
```

## POST : /admin/canclereserve
> Require
```
no - Int
분실물의 고유 번호
```

> Response : Success
```
status - 200
message - Success
```

## POST : /admin/return
> Require
```
no - Int
분실물의 고유번호
```

> Response : Success
```
status - 200
message - Success
```
