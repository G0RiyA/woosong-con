# Schema
## Admin
어드민 데이터 스키마입니다

>id
>```
>String
>어드민 아이디입니다
>```

>pw
>```
>String
>어드민 비밀번호입니다
>```

>station
>```
>String
>어드민의 근무지역입니다
>```

## Lost article
분실물 데이터 스키마입니다

>no
>```
>Int
>분실물 번호입니다
>```

> itemname
> ```
> String
> 분실물 이름입니다
>```

>daytime
>```
>String
>분실물을 습득한 날짜 및 시간입니다
>```

>comment
>```
String
>분실물을 찾아가기로 한 사람의 코멘트입니다
>예약된 물품에만 존재합니다
>```

>getLocation
>```
>String
>분실물을 습득한 위치입니다
>```

>storageLocation
>```
>Stirng
>분실물을 보관 중인 위치입니다
>```

>imagePath
>```
>Image
>분실물의 사진 입니다
>```

>owner
>```
>String
>분실물을 찾아간(갈) 유저의 전화번호입니다
>예약된 물품에만 존재합니다
>```

>description
>```
>String
>분실물에 대한 특이사항입니다
>```
