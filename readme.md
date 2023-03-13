# ROUTE BOOK
> GET | `/books`
- untuk mengambil data semua buku
> GET | `/books/{id}`
- untuk mengambil detail buku
> POST | `books/create`
- untuk menambah buku baru
Harus mengirimkan properti berikut: \
title: \
author: \
publisher: \
year: (integer) \
isbn: \
language: \
page: \
length: \
weigth: \
width: \
cover: (URL IMAGE) \
description: \
category: \
rating: \
> PUT | `books/:id/edit`
- untuk mengedit buku (WAJIB MENGIRIMKAN ID)
- untuk menambah buku baru
Harus mengirimkan properti berikut untuk edit: \
title: \
author: \
publisher: \
year: (integer) \
isbn: \
language: \
page: \
length: \
weigth: \
width: \
cover: (URL IMAGE) \
description: \
category: \
rating: \
> DELETE | `books/:id`
- untuk menghapus buku (WAJIB MENGIRIMKAN ID)
