# 🛍️ Loulou Boutiqaat - Frontend (متجر لولو بوتيكات)

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black)](https://react.js.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-1.9.3-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Styled Components](https://img.shields.io/badge/Styled--Components-5.3.6-DB7093?logo=styled-components&logoColor=white)](https://styled-components.com/)
[![React Router](https://img.shields.io/badge/React%20Router-v6.8.0-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

منصة تجارة إلكترونية عصرية وفاخرة متخصصة في مستحضرات التجميل، العطور، الأزياء، والإكسسوارات. تم بناء واجهة المستخدم باستخدام **React 18** و **Redux Toolkit** مع تصميم تفاعلي يدعم اللغة العربية (RTL) والوضع الليلي/النهاري، ومجهزة بنظام حماية الصلاحيات وسلة مشتريات ذكية للمستخدمين والزوار.

---

## ✨ المميزات الرئيسية (Key Features)

- 🎨 **تصميم عصري متجاوب (Responsive & RTL-first)**: تجربة مستخدم سلسة على جميع الأجهزة (موبايل، تابلت، حاسوب).
- 🌓 **دعم الوضع الليلي والنهاري (Dark / Light Theme)**: إمكانية التبديل مع حفظ التفضيل محلياً.
- 🔐 **نظام تسجيل دخول ومصادقة متقدم (Authentication & RBAC)**:
  - دعم التحقق عبر الهاتف و OTP باستخدام Firebase.
  - إدارة الجلسات عبر JWT Access Tokens و Refresh Tokens في ملفات تعريف ارتباط آمنة (HttpOnly Cookies).
  - توجيه محمي بالصلاحيات (Admin, Editor, Customer).
- 🛒 **سلة مشتريات ذكية (Guest Cart & DB Sync)**:
  - إمكانية إضافة المنتجات للسلة والعمل كزائر دون تسجيل دخول.
  - مزامنة تلقائية فورية لسلة الزائر مع قاعدة البيانات بمجرد تسجيل الدخول.
- 💖 **قائمة المفضلة (Wishlist / Saved Items)**: حفظ المنتجات المفضلة مع مزامنة سحابية.
- 🔍 **بحث وفلترة فورية**: استعراض المنتجات وتصنيفها حسب الأقسام، السعر، والتطابق النصي.
- 📊 **لوحة تحكم إدارية متكاملة (Admin & Editor Dashboard)**:
  - إضافة وتعديل وحذف المنتجات والأقسام.
  - متابعة وإدارة الطلبات وتحديث حالتها.
  - إدارة المستخدمين وتعديل الصلاحيات (خاص بالمدير).
  - تحديث روابط التواصل الاجتماعي ومعلومات التواصل.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

| المجال | التقنية |
| :--- | :--- |
| **المكتبة الأساسية** | React 18 |
| **إدارة الحالة العامة** | Redux Toolkit & React-Redux |
| **التنسيق والتصميم** | Styled-Components, CSS3, Modern Theme Provider |
| **التوجيه (Routing)** | React Router DOM v6 |
| **التعامل مع الـ API** | Axios (مع Interceptors لتجديد الـ Token تلقائياً) |
| **التحقق من المدخلات** | Yup Validation Schema |
| **المصادقة و OTP** | Firebase Authentication |
| **الحاويات** | Docker & Nginx |

---

## 🚀 التشغيل والتثبيت (Getting Started)

### المتطلبات الأساسية
- **Node.js** (إصدار 18 فما فوق)
- **npm** أو **pnpm**
- تشغيل خادم الباك إند [Loulou-Boutiqaat-backend](../Loulou-Boutiqaat-backend) على المنفذ `3500`.

### 1. إعداد المتغيرات البيئية
أنشئ ملف `.env` في المسار الرئيسي للواجهة بالاعتماد على `.env.example`:
```env
REACT_APP_API=http://localhost:3500
REACT_APP_API2=http://localhost:3500

REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
```

### 2. تثبيت الحزم
```bash
npm install
```

### 3. تشغيل وضع التطوير
```bash
npm start
```
يفتح التطبيق تلقائياً على [http://localhost:3000](http://localhost:3000).

### 4. بناء نسخة الإنتاج
```bash
npm run build
```

---

## 🐳 التشغيل باستخدام Docker

يمكنك بناء وتشغيل الواجهة عبر حاوية Nginx جاهزة:
```bash
docker build -t loulou-front .
docker run -p 3000:80 loulou-front
```

---

## 🔑 حسابات تجريبية للاختبار (Demo Accounts)

| الدور (Role) | رقم الهاتف | كلمة المرور | الصلاحيات |
| :--- | :--- | :--- | :--- |
| **مدير (Admin)** | `+970590000001` | `Password123!` | وصول كامل للوحة التحكم والمستخدمين |
| **محرر (Editor)** | `+970590000002` | `Password123!` | إضافة وتعديل المنتجات والأقسام والطلبات |
| **زبونة (Customer)**| `+970590000003` | `Password123!` | تصفح، سلة الشراء، المفضلة، الطلبات |

---

## 👨‍💻 المطور (Developer)

- **محمد قطناني (Mohammed Katanani)**
- Website: [thekatanani.com](https://thekatanani.com)
- GitHub: [@TheKatanani](https://github.com/TheKatanani)
