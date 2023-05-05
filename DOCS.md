## DBとの連携
Prismaを使って行う

## Hasuraとの繋ぎ
- GraphQL Requestを使って取得する
- 取得時は、キレイな形にエンコードしてあげる（GeoJSON → Original Format）
- 作成・更新時は、デコードしてあげる（Original Format → GeoJSON）

### 上2つはRepositoryとしてラップしてあげる

