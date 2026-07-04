# Scento - Perfume Boutique

Scento არის ონლაინ სუნამოების მაღაზია, შექმნილი **React**-ისა და **TypeScript**-ის გამოყენებით. პროექტი იყენებს **DummyJSON API-ს** (`fragrances` კატეგორია), რის შედეგადაც პროდუქტების მონაცემები რეალურ API-დან იტვირთება და არა ლოკალური ფაილებიდან.

## Demo

* **Live Demo:** https://scentoperfumes.netlify.app
* **GitHub Repository:** https://github.com/ketymm/perfume-shop

---

# პროექტის შესახებ

პროექტის მთავარი მიზანია თანამედროვე React აპლიკაციის შექმნა, რომელიც იყენებს API-ს, მრავალენოვან მხარდაჭერას, თემების გადართვას, კალათის ფუნქციონალს და რესპონსიულ დიზაინს.

---

# გამოყენებული ტექნოლოგიები

| ტექნოლოგია     | აღწერა                                |
| -------------- | ------------------------------------- |
| React 19       | მომხმარებლის ინტერფეისი               |
| TypeScript     | მკაცრი ტიპიზაცია                      |
| Vite           | პროექტის აწყობა და Development Server |
| React Router   | გვერდებს შორის ნავიგაცია              |
| Axios          | HTTP მოთხოვნები                       |
| DummyJSON API  | პროდუქტების მონაცემები                |
| SCSS Modules   | კომპონენტების სტილები                 |
| Context API    | Global State Management               |
| LocalStorage   | Theme, Language, Cart და Favorites    |
| SessionStorage | Shop გვერდის ძებნა და სორტირება       |
| Oxlint         | კოდის ანალიზი                         |
| Prettier       | კოდის ფორმატირება                     |

---

# რატომ ეს ტექნოლოგიები?

## DummyJSON API

DummyJSON-ის `fragrances` კატეგორია შეიცავს რეალურ საპარფიუმერო პროდუქტებს, მათ შორის ბრენდს, ფასს, რეიტინგს, მარაგსა და რამდენიმე სურათს. სწორედ ამიტომ ეს API კარგად მოერგო პროექტის თემატიკას.

## Context API

პროექტში გლობალური state მოიცავს მხოლოდ:

* Theme
* Language
* Cart
* Favorites
* Toast

ამ მოცულობისთვის Context API საკმარისია და დამატებითი state management ბიბლიოთეკების გამოყენება საჭირო არ არის.

## SCSS Modules

SCSS Modules გამოიყენება კომპონენტების სტილების იზოლაციისთვის, ხოლო საერთო დიზაინ-სისტემა აგებულია SCSS ცვლადებისა და mixin-ების გამოყენებით.

---

# ლოკალურად გაშვება

საჭიროა:

* Node.js 20+
* npm

პროექტის კლონირება:

```bash
git clone <repository-url>
```

დამოკიდებულებების დაყენება:

```bash
npm install
```

Development Server-ის გაშვება:

```bash
npm run dev
```

შემდეგ გახსენით:

```text
http://localhost:5173
```

---

# ხელმისაწვდომი სკრიპტები

```bash
npm run dev
```

Development რეჟიმი.

```bash
npm run build
```

Production Build.

```bash
npm run preview
```

Production Build-ის ლოკალური გახსნა.

```bash
npm run lint
```

კოდის სტატიკური ანალიზი.

```bash
npm run format
```

კოდის ავტომატური ფორმატირება.

---

# Deploy

Production Build-ის შესაქმნელად:

```bash
npm run build
```

Netlify-ზე ატვირთეთ `dist` საქაღალდე ან დაუკავშირეთ GitHub Repository.

Build Command:

```text
npm run build
```

Publish Directory:

```text
dist
```

React Router-ის სწორად მუშაობისთვის დაამატეთ `public/_redirects` ფაილი შემდეგი შიგთავსით:

```text
/* /index.html 200
```

---

# პროექტის სტრუქტურა

```text
src/
├── api/
├── components/
├── context/
├── hooks/
├── i18n/
├── pages/
├── styles/
├── types/
├── App.tsx
└── main.tsx
```

## საქაღალდეების აღწერა

**api** — Axios-ის კონფიგურაცია და API მოთხოვნები.

**components** — ხელახლა გამოყენებადი UI კომპონენტები.

**context** — Theme, Language, Cart, Favorites და Toast Context-ები.

**hooks** — Custom Hooks LocalStorage-ისა და SessionStorage-ისთვის.

**pages** — Route-ებთან დაკავშირებული გვერდები.

**styles** — გლობალური SCSS, ცვლადები და mixin-ები.

**types** — TypeScript ტიპები.

---

# კოდის კონვენციები

* Components — PascalCase
* Types — PascalCase
* Variables და Functions — camelCase
* SCSS Variables — kebab-case

Persistent მონაცემები ინახება Custom Hooks-ის საშუალებით:

* Theme
* Language
* Cart
* Favorites

---

# ფუნქციონალი

## API

* პროდუქტის კატალოგის მიღება
* პროდუქტის დეტალური ინფორმაციის მიღება
* პროდუქტის ძებნა

## Routing

* `/`
* `/shop`
* `/product/:id`
* `/cart`
* `/favorites`
* `*` (404)

## LocalStorage

ინახება:

* Theme
* Language
* Cart
* Favorites

## SessionStorage

ინახება:

* Shop გვერდის ძებნის პარამეტრები
* Shop გვერდის სორტირების პარამეტრები

---

# Responsive Design

პროექტი შექმნილია Mobile First მიდგომით და დატესტილია Chrome DevTools-ის სხვადასხვა მოწყობილობაზე.

---

# დამატებითი შესაძლებლობები

* პროდუქტის Gallery Modal
* Checkout Confirmation Modal
* Focus Trap
* ESC ღილაკით დახურვა
* Body Scroll Lock
* Toast შეტყობინებები
* Dark და Light Theme
* ქართული და ინგლისური ინტერფეისი
* გვერდებს შორის მსუბუქი ანიმაციები

---

# სურათების შესახებ

Hero სექციაში გამოყენებულია Unsplash-ის თავისუფალი ლიცენზიის მქონე ფოტო.

პროდუქტების ყველა სურათი იტვირთება DummyJSON API-დან. პროექტში განზრახ არ არის გამოყენებული ცნობილი ადამიანების სარეკლამო ფოტოები საავტორო და publicity უფლებების გათვალისწინებით.

---

# Screenshots

* Home Page / მთავარი გვერდი

<img width="1710" height="888" alt="image" src="https://github.com/user-attachments/assets/b2212578-16ca-4db5-af71-a379c19b092b" />


* Shop / კატალოგი

<img width="1710" height="902" alt="image" src="https://github.com/user-attachments/assets/8eeefd81-3431-42f8-9b5f-7d3266376024" />


* Product Details / პროდუქტის აღწერა

<img width="1709" height="902" alt="image" src="https://github.com/user-attachments/assets/e4a7ccbd-c548-4806-b6d0-223989f3fdc1" />


* Cart / კალათა

<img width="1710" height="906" alt="image" src="https://github.com/user-attachments/assets/502799bd-f030-4ecf-aa1f-2f6846f75872" />

  
* Favorites / რჩეუელები

<img width="1710" height="906" alt="image" src="https://github.com/user-attachments/assets/60f99941-7b4e-4940-b43d-643a68284d82" />


* Light Mode / დღის რეჟიმი

<img width="1709" height="903" alt="image" src="https://github.com/user-attachments/assets/04dedf3e-f769-40a0-916d-3ac26c841006" />

* Dark Mode / ღამის რეჟიმი

<img width="1710" height="899" alt="image" src="https://github.com/user-attachments/assets/06bff1a1-eae5-4e64-8fd6-b0f4ee48e371" />
