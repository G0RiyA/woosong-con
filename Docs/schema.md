# Schema
## User
유저 데이터 스키마입니다
> id
>```
>String
>유저 아이디 입니다
>```

>pw
>```
>String
>유저 비밀번호 입니다
>```

>token
>```
>String
>유저 토큰 입니다
>```

>email
>```
>String
>유저 이메일 입니다
>```

>username
>```
>String
>유저 이름 입니다
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

>getLocation
>```
>String
>분실물을 습득한 위치입니다
>```

>storageLocation
>```
>Stirng
>분실물을 보관 중인 위치입니다.
>```

>image
>```
>Image
>분실물의 사진 입니다
>```

>user
>```
>String
>분실물을 습득한 유저의 token입니다
>```

>owner
>```
>String
>분실물을 찾아간 유저의 token입니다
>```
