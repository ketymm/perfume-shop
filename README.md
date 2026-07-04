# Scento — Perfume Boutique

სუნამოების ონლაინ მაღაზია, აგებული React + TypeScript-ზე, DummyJSON-ის რეალურ `fragrances`
კატეგორიაზე API ინტეგრაციით.

🔗 **Live demo:** _ჩასვით თქვენი Netlify/Vercel/GH Pages ბმული აქ, დეპლოის შემდეგ_
🔗 **Repository:** _ჩასვით თქვენი GitHub ბმული აქ_

---

## Tech stack

| ფენა               | ინსტრუმენტი                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Framework          | React 19 + TypeScript, აწყობილია Vite-ით                                                                                 |
| Routing            | React Router DOM 6/7 (`BrowserRouter`, dynamic routes, 404 catch-all)                                                    |
| HTTP client        | Axios (`src/api/productsApi.ts`)                                                                                         |
| API                | [DummyJSON](https://dummyjson.com/docs/products) — `/products/category/fragrances`, `/products/{id}`, `/products/search` |
| სტილები            | SCSS (Sass) — CSS Modules + გლობალური დიზაინ-ტოკენები (`_variables.scss`, `_mixins.scss`)                                |
| State              | React Context API (Theme, Language, Cart, Favorites, Toast)                                                              |
| Storage            | `localStorage` — თემა, ენა, კალათა, რჩეულები · `sessionStorage` — შოპის ძებნა/სორტირება                                  |
| i18n               | საკუთარი მსუბუქი i18n იმპლემენტაცია (`ka` / `en`), `LanguageContext` + `translations.ts`                                 |
| Linting/Formatting | oxlint + Prettier                                                                                                        |

### რატომ ეს არჩევანები

- **DummyJSON** გამოყენებულია რეალურ საპარფიუმერო კატალოგად — მას აქვს ნამდვილი `fragrances`
  კატეგორია სახელებით, ბრენდებით, ფასებით, რეიტინგებით, მარაგით და მრავალი სურათით ერთი
  პროდუქტისთვის, რაც ზუსტად ერგება საიტის თემას.
- **Context API** ნაცვლად Redux-ის — მოცულობის გათვალისწინებით (თემა/ენა/კალათა/რჩეულები)
  საკმარისია მსუბუქი, ჩაშენებული გადაწყვეტა ზედმეტი დამოკიდებულებების გარეშე.
- **CSS Modules + SCSS** უზრუნველყოფს კომპონენტების იზოლირებულ სტილებს + საერთო
  დიზაინ-სისტემას (ცვლადები, mixin-ები, ბრექფოინთები) გამეორების გარეშე.

---

## გაშვება ლოკალურად

მოთხოვნები: **Node.js 20+** და npm.

```bash
# 1. დამოკიდებულებების დაყენება
npm install

# 2. dev სერვერის გაშვება
npm run dev
```

გახსენით საიტი: **http://localhost:5173**

### სხვა სკრიპტები

```bash
npm run build     # production build → dist/
npm run preview   # production build-ის ლოკალური გახსნა
npm run lint       # oxlint სტატიკური ანალიზი
npm run format     # prettier — კოდის ავტოფორმატირება
```

### დეპლოი (Netlify მაგალითი)

1. `npm run build` — შექმნის `dist/` ფოლდერს.
2. Netlify-ზე: **New site → Deploy manually**, ატვირთეთ `dist/` ფოლდერი, ან დააკავშირეთ
   GitHub რეპოზიტორი Build command-ით `npm run build` და Publish directory-თი `dist`.
3. SPA routing-ისთვის დაამატეთ `public/_redirects` ფაილი შემცველი: `/* /index.html 200`
   (React Router-ის client-side routes რომ არ დაიშალოს reload-ზე).

---

## ფოლდერების სტრუქტურა

```
src/
├── api/                  # Axios API client (DummyJSON-თან კომუნიკაცია)
│   └── productsApi.ts
├── components/           # განმეორებადი, "სულელი" UI კომპონენტები
│   ├── Header/
│   ├── Footer/
│   ├── ProductCard/
│   ├── Modal/            # პორტალზე დაფუძნებული accessible მოდალი
│   ├── ThemeToggle/
│   ├── LanguageToggle/
│   ├── NotePyramid/       # "სუნამოს პირამიდის" ბრენდირებული სექცია
│   ├── Loader/            # spinner + skeleton loading states
│   └── ToastStack/
├── context/               # გლობალური state — Theme, Language, Cart, Favorites, Toast
├── hooks/                 # useLocalStorage, useSessionStorage
├── i18n/                  # translations.ts — ka/en ლექსიკონი
├── pages/                 # როუტებზე მიბმული გვერდები
│   ├── Home/
│   ├── Shop/
│   ├── ProductDetails/
│   ├── Cart/
│   ├── Favorites/
│   └── NotFound/
├── styles/                # გლობალური SCSS — ცვლადები, mixin-ები, reset
├── types/                 # საერთო TypeScript ტიპები (Product, CartItem...)
├── App.tsx                # როუტინგი + providers-ის კომბინაცია
└── main.tsx                # React entry point
```

**კონვენციები:**

- კომპონენტი = ფოლდერი საკუთარი `Component.tsx` + `Component.module.scss`-ით.
- ცვლადები/ფუნქციები — `camelCase`; კომპონენტები/ტიპები — `PascalCase`; SCSS ცვლადები — `kebab-case`.
- ყველა persistent state (თემა, ენა, კალათა, რჩეულები) გადის საკუთარ `hooks/useLocalStorage`-ზე.

---

## ფუნქციონალი

- **API ინტეგრაცია (Axios):** კატალოგის წამოღება, ცალკეული პროდუქტის დეტალები, ძებნა.
- **Routing:** `/`, `/shop`, `/product/:id`, `/cart`, `/favorites`, `*` (404).
- **Storage:**
  - `localStorage` — თემა, ენა, კალათის შემცველობა, რჩეულების სია (გადარჩება refresh-საც).
  - `sessionStorage` — შოპის გვერდის საძიებო/სორტირების მდგომარეობა (მხოლოდ სესიის განმავლობაში).
- **რესპონსივი დიზაინი** — mobile-first, ტესტირებული Chrome DevTools-ის ყველა ძირითად
  device პრესეტზე (iPhone SE, iPhone 12/14 Pro, Pixel, Galaxy, iPad Mini/Air/Pro, Desktop).
- **ანიმაციები/მოდალები:**
  - გვერდის ჩატვირთვის fade/rise ანიმაციები, hover მიკროანიმაციები ბარათებზე.
  - `Modal` კომპონენტი — პროდუქტის გალერეა + checkout დადასტურება (focus trap, Esc დახურვა,
    body scroll lock, `prefers-reduced-motion` პატივისცემა).
  - Toast შეტყობინებები კალათაში დამატებისას.
- **ორი თემა (Dark/Light):** `ThemeContext`, ინახება `localStorage`-ში, პატივს სცემს
  სისტემურ პრეფერენციასაც პირველი ვიზიტისას.
- **ორენოვანი (ქართული/ინგლისური):** `LanguageContext` + `translations.ts`.
- **TypeScript** — მთელი კოდბაზა მკაცრი ტიპებით (`Product`, `CartItem` და ა.შ).
- **SCSS** — დიზაინ-ტოკენები, mixin-ები, responsive breakpoint helper-ები.

---

## შენიშვნა სურათებთან დაკავშირებით

მთავარი გვერდის hero სექციაში გამოყენებულია სუნამოს პროდუქტის სტოკ-ფოტო
([Unsplash License](https://unsplash.com/license), თავისუფალი კომერციული გამოყენებისთვის).
რეალური ცნობილი ადამიანების ფოტოები (მაგ. სარეკლამო კამპანიების ფოტოები) განზრახ არ არის
გამოყენებული საავტორო/publicity უფლებების გამო — ამის ნაცვლად კატალოგის ყველა პროდუქტის
სურათი მოდის უშუალოდ DummyJSON API-დან.

---

## Screenshots

_დეპლოის შემდეგ დაამატეთ სქრინშოთები აქ (მთავარი გვერდი, კატალოგი, პროდუქტის გვერდი,
კალათა, dark/light თემა)._
