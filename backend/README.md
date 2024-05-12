# Dokumentasi Server Back End API
Sebelum menjalankan server backend, alangkah baiknya mengikuti hal-hal berikut agar server berjalan dengan lancar, aman, nyaman dan damai. Langkah-langkah ini diperuntukkan untuk yang baru menggunakan, jika ada command atau tools yang sudah pernah diinstal silakan abaikan langkah tersebut.

## Menginstall Database MongoDB
Pastikan sudah menginstall MongoDB Servernya. Jika server MongoDB belum terinstall, bisa mengunduh file server dan menginstall di komputer masing-masing. Untuk link download file server MongoDB bisa klik [link berikut ini](https://www.mongodb.com/try/download/community).

## Konfigurasi Menginstall Live Server Node.JS
Pada langkah ini digunakan untuk bisa menjalankan file JS agar ketika terjadi perubahan kita tidak usah unutk mematikan server lalu menjalankan file tersebut kembali. Disini saya menggunakan tools **[nodemon](https://nodemon.io/)**. Silakan bisa baca-baca dokumentasi resmi dari nodemon itu sendiri, disini saya akan menjelaskan cara-cara instalasinya :

```bash
npm install -g nodemon
```

Setelah menjalankan perintah diatas pada terminal, silakan merestart terminal dengan cara close terminal lalu buka terminal lagi. Untuk mengecek apakah **nodemon** sudah terinstall pada komputer, kita bisa membuka terminal dan mengetikkan perintah :

```bash
nodemon -v
```

Jika setelah menjalankan perintah tersebut muncul dari versi nodemonnya, itu artinya nodemon sudah terinstall pada komputer kita, tapi jika belum artinya komputer tidak membaca nodemon yang sudah kita install, silakan pergi ke environment variabel pada komputer windows dan masukkan path dari nodemon itu sendiri lalu restart komputer.

## Menjalankan File Utama Server
Untuk bisa menjalankan server backend secara local, kita bisa menjalankan perintah ``nodemon app``, tapi sebelum kita menjalankan file tersebut silakan ikuti langkah-langkah berikut ini :

```bash
npm install
```

Perintah tersebut akan mengunduh semua dependensi yang digunakan pada server. Setelah mengunduh semua dependensi, kita bisa menjalankan file ``seeder.js`` untuk menambahkan data dummy ke dalam database MongoDB.

```bash
node seeder
```

Setelah menjalankan perintah tersebut dan tidak keluar dari proses running, cukup ketik <kbd>Ctrl</kbd> + <kbd>C</kbd> maka proses running akan keluar.

Sekarang kita bisa menjalankan file utama server backend menggunakan **nodemon**, kalian bisa mengetikkan perintah ini di terminal.

```bash
nodemon app
```

Maka server backend akan berjalan secara live di localhost:{port}. Dengan menggunakan nodemon, ketika ada perubahan kode yang terjadi kita tidak perlu mematikan server dan menjalankan file server lagi. Dan untuk bisa mematikan server kalian bisa mengetikkan <kbd>Ctrl</kbd> + <kbd>C</kbd>.

## Endpoint API Yang Tersedia

Berikut adalah endpoint API yang bisa digunakan di server backend :

1. ``POST`` ``/login`` untuk melakukan proses login pengguna
    ```json
    {
        "email": "nurulrahmanda@gmail.com",
        "password": "123456"
    }
    ```
2. ``POST`` ``/register`` untuk proses registrasi pengguna <br> Contoh request data :
    ```json
    {
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@gmail.com",
        "password": "123456",
        "confPassword": "123456"
    }
    ```
3. ``DELETE`` ``/logout`` untuk proses logout pengguna yang sudah login
4. ``GET`` ``/token`` untuk mendapatkan akses token
5. ``GET`` ``/users`` untuk mendapatkan data semua pengguna `otorisasi`
6. ``GET`` ``/user`` untuk mendapatkan data pengguna yang sedang login `otorisasi`
7. ``GET`` ``/products`` untuk mendapatkan semua data produk `otorisasi`
8. ``GET`` ``/product/{kodeProduk}`` untuk mendapatkan data produk berdasarkan kode produknya `otorisasi`
9. ``POST`` `/product` untuk menambahkan data produk ke dalam database `otorisasi` <br> Contoh request data : 
    ```json
    {
        "namaProduk": "Sepatu Aerox",
        "harga": 359000,
        "stok": 12,
        "posisiRak": "L1-1-4-2"
    }
    ```
10. ``PUT`` ``/product/{kodeProduk}`` untuk mengubah data produk <br> Contoh request data :
    ```json
    {
        "namaProduk": "Sepatu Yamaha",
        "harga": 349000,
        "stok": 12,
        "posisiRak": "L1-2-4-2"
    }
    ```
11. ``PATCH`` ``/product/{kodeProduk}`` untuk menambah stok jika ada barang masuk <br> Contoh request data :
    ```json
    {
        "stokBaru": 24
    }
    ```
12. ``DELETE`` ``/product/{kodeProduk}`` untuk menghapus kode produk
12. ``GET`` ``/inproducts`` untuk mendapatkan semua data barang masuk atau history `otorisasi`
13. ``GET`` ``/inproducts/last30days`` untuk mendapatkan history barang masuk 30 hari terakhir
14. ``GET`` ``/inproducts/data-by-period`` untuk mendapatkan history barang masuk berdasarkan periode waktu awal dan akhir tertentu. Data dikirimkan dengan metode `GET` <br> Contoh request data :<br>`http://localhost:5000/inproducts/data-by-period?start=2024-03-09&end=2024-03-25`
15. ``GET`` ``/inproducts/data-by-month`` untuk mendapatkan history barang masuk perbulan. Data request dikirim dengan menggunakan method `GET` <br>Contoh request data :<br> `http://localhost:5000/inproducts/data-by-month?month=03&year=2024`
16. ``GET`` ``/outproducts`` untuk mendapatkan semua data barang keluar atau history `otorisasi`
17. ``GET`` ``/outproducts/last30days`` untuk mendapatkan history barang keluar 30 hari terakhir
18. ``GET`` ``/outproducts/data-by-period`` untuk mendapatkan history barang keluar berdasarkan periode waktu awal dan akhir tertentu. Data dikirimkan dengan metode `GET` <br> Contoh request data :<br>`http://localhost:5000/outproducts/data-by-period?start=2024-03-09&end=2024-03-25`
19. ``GET`` ``/outproducts/data-by-month`` untuk mendapatkan history barang keluar perbulan. Data request dikirim dengan menggunakan method `GET` <br>Contoh request data :<br> `http://localhost:5000/inproducts/data-by-month?month=03&year=2024`
20. ``GET`` ``/transactions`` untuk mendapatkan semua data transaksi atau history transaksi barang keluar
21. ``GET`` ``/transaction/{idTransaksi}`` untuk mendapatkan satu data transaksi berdasarkan id transaksi
21. ``POST`` ``/transaction`` untuk menambahkan data transaksi baru `otorisasi` <br> Contoh request data : 
    ```json
    {
        "namaPemesan": "Khaeril Anwar",
        "alamatPengiriman": "Jl. Gajah Mada Bogor Indonesia",
        "barangKeluar": [
            {
                "kodeProduk": 1687435916970,
                "kuantitas": 10
            },
            {
                "kodeProduk": 1617570119708,
                "kuantitas": 11
            },
            {
                "kodeProduk": 3785372871339,
                "kuantitas": 12
            },
            {
                "kodeProduk": 8411853826123,
                "kuantitas": 13
            },
            {
                "kodeProduk": 8415415203023,
                "kuantitas": 14
            }
        ]
    }
    ```
21. ``DELETE`` ``/transaction/{idTransaksi}`` untuk menghapus satu data transaksi berdasarkan id transaksi
22. ``PUT`` ``/transaction/{idTransaksi}`` untuk mengubah data transaksi berdasarkan id transaksi `otorisasi` <br> Contoh request data : 
    ```json
    {
        "namaPemesan": "Khaeril Anwar",
        "alamatPengiriman": "Jl. Gajah Mada Bogor Indonesia",
        "barangKeluarBaru": [
            {
                "kodeProduk": 1687435916970,
                "kuantitas": 10
            },
            {
                "kodeProduk": 1617570119708,
                "kuantitas": 11
            },
            {
                "kodeProduk": 3785372871339,
                "kuantitas": 12
            },
        ],
        "barangKeluarLama": [
            {
                "kodeProduk": 1687435916970,
                "kuantitas": 23
            },
            {
                "kodeProduk": 1617570119708,
                "kuantitas": 31
            },
        ]
    }
    ```
22. ``PATCH`` ``/transaction/{idTransaksi}`` untuk mengubah status `on process` menjadi `success`. <br> Status dalam transaksi ini memiliki 2 status yaitu `on process` dan `success`, masing-masing status dalam data mewakili 1 angka integer yaitu : 
    - Angka `0` mewakili status  `on process`
    - Angka `1` mewakili status `success`


22. ``POST`` ``/reset-password`` untuk mengirimkan email berisi link (localhost:5173/reset/token)
    ```json
    {
        "email": "johndoe@gmail.com",
    }
    ```
23. ``GET`` ``/verify-reset-token/:token`` untuk verifikasi token yang didapatkan dari link yang dikirimkan

24. ``GET`` ``/update-password`` untuk mengubah password terbaru dengan `auth` token yang didapatkan
   ```json
    {
       "newPassword": "newpassword",
       "confirmNewPassword": "newpassword"
    }
   ```
25. ``GET`` ``/racks-all`` untuk mendapatkan semua data dan status rak 

26. ``GET`` ``/racks-empty`` untuk mendapatkan data rak dengan kapasitas kosong 

Demikianlah dokumentasi yang disajikan oleh Server Back End.

Author : [Khaeril Anwar](https://github.com/khaerilanwar) & [Jozanda Aulia](https://github.com/jossanda17)
