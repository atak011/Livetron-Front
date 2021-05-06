# Livetron 
## Canlı Yayın ve Artırılmış Gerçeklik Deneyimleri Sunan Bir Ticaret Uygulaması. (Live Commerce & Augmented Reality)
_____

![LiveTron](/media/logo.jpg)

[Livetron Gitbook](https://livetron.gitbook.io/livetron)
____

Günümüzde ticaretin boyutları genişliyor ve artık nerede olursanız olun istediğiniz ürün hakkında canlı bir şekilde bilgi alabileceksiniz. 

Aynı zamanda Lİvetron **Augmented Reality** sunan bir uygulama. Yani sadece ürüne bakmanın yanı sıra ürünün nasıl olacağına dair gerçekçi bir fikir edinebilirsiniz.
____
![LiveTron](/media/Screenshot-2021-01-26-at-16.50.41.png)
____

#### Docker ile Kurulum
____



**Proje klonlandıktan sonra;**

`
git clone proje-link
`

**Frontend:**

**./Livetron-FE:** `npm install`

`
docker build -t "livetron-fe" ./Livetron-FE/
`

**Backend:**

**.env dosyasının var olduğundan emin olun.**

**./Livetron-BE:** `composer install`

`
docker build -t "livetron-be" ./Livetron-BE/`

Build

`docker-compose up`

**Running on:** localhost:3000


____

#### Normal Kurulum
____

**Backend**

Aşağıdaki komutları sırasıyla çalıştırarak projeyi ayağa kaldırabilirsiniz.

```
$ composer install

$ php artisan migrate

$ php artisan serve
```

**Frontend**

Aşağıdaki komutları sırasıyla çalıştırarak projeyi ayağa kaldırabilirsiniz.

```
$ npm install

$ npm start
```

**Postman Collection için;**

[Collection](media/livetron.postman_collection.json)
____


![LiveTron](/media/logo.jpg)





