# Manga - API

### BASE_URL: https://manga-api-production.up.railway.app/v1/

### /rank:

```
 GET /rank/title: Lấy tên các loại sắp xếp (vd: Top All, Top Tháng, Truyện Mới,....);
 GET /rank/the-loai: Lấy tất cả thể loại (vd: Action, Cổ Đại, Drama,....);
 GET /rank/the-loai/:type?status={status}&sort={sort}

 params: {
    type?: String, Mô tả: Thể lọai truyện muốn lấy (vd: action-95, anime)
 }

 query: {
    // cách lấy:
    //    lấy qua kết quả trả về của /rank/title
    //    (sẽ bao gồm một mảng các object chứa href và title, href sẽ chứa string "?status=-1&sort=15 )

    mặt định không có query sẽ trả về sắp xếp theo Ngày cập nhật
    status?: Number, Mô tả: hình như auto = -1,
    sort?: Number, Mô tả: chỉ định sắp xếp theo (vd: Truyện mới, Top All,....)
    page?: Number (mặc định = 1)
 }
```

### /home

```
GET /home: Lấy dữ liệu trang chủ bao gồm truyện mới cập nhật và truyện đề cử

query: {
    page?: Number (mặc định = 1)
}
```

### /details/:slug

```
GET /details/:slug: Lấy chi tiết chuyện bao gồm (name, author, content, chapters,....)
```

### /read?slug={slug}

```
GET /read?slug={slug}: Đọc chuyện lấy về toàn bộ ảnh của chap chỉ định và các chapters còn lại của chuyện
```

### /search?keyword={keyword}&page={page}

```
GET /search?keyword={keyword}&page={page}: Tìm kiếm truyện theo từ khóa

params: {
    keyword: string,
    page?: (mặc định = 1)
}
```

### ABGGGGGdgdfggfdgdfg

```
GET /search?keyword={keyword}&page={page}: Tìm kiếm truyện theo từ khóa

params: {
    keyword: string,
    page?: (mặc định = 1)
}
```
