# Admin
## POST : /admin/login
> Require
```
id - String
어드민 아이디

pw - String
어드민 패스워드

station - String
어드민의 근무지역
```
> Response : Success
```
status - 200
message - "Login Success"
```
>Respons : Fail
```
status - 401
message - "Login Failed"
```

## GET : /admin/items
> Require
```
None
```

> Response : Success
```
status - 200
data - {
  queue - 아직 승인되지 않은 물품들의 목록
  items - 승인이 완료된 물품들의 목록
}
```

> Response : Fail
```
status - 403
message - Permission error
어드민으로 로그인되어있지 않으면 발생
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
}
```

> Response : Fail
```
status - 403
message - Permission error
어드민으로 로그인되어있지 않으녀 발생
```

## GET : /admin/stationinfo
> Require
```
None
```

> Response : Success
```
status - 200
data - String으로 역 이름 반환
```

> Response : Fail
```
status - 403
message - Permission error
어드민으로 로그인되어있지 않으면 발생
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
status - 403
message - "Permission error"
어드민으로 로그인되어있지 않으면 발생
```

> Response : Fail
```
status - 404
message - "Item not found"
no에 해당하는 아이템을 찾을 수 없으면 발생
```
