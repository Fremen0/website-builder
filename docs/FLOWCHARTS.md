# مخططات سير العمل للمشروع (Flow Charts)

يحتوي هذا المستند على مخططات سير العمل الرئيسية لمشروع **باني المواقع (Website Builder)**، وهو يوضح التفاعل بين المكونات والأدوار المختلفة داخل النظام.

---

## 1. الهيكل العام للنظام (System Architecture)

يوضح هذا المخطط العلاقة بين واجهة المستخدم (Client) والحادم (Server) وقاعدة البيانات (Database).

```mermaid
graph TD
    User((المستخدم))
    UI[واجهة المتصفح - React]
    Server[الخادم - Node.js/Express]
    DB[(قاعدة بيانات - MongoDB)]
    Storage[مخزن الملفات - Uploads Folder]

    User <--> UI
    UI <-->|API Calls / JSON| Server
    Server <-->|Mongoose| DB
    Server <-->|File Stream| Storage
```

![الهيكل العام للنظام](./images/system_architecture.png)

---

## 2. سير عملية التوثيق والتحقق (Authentication Flow)

يوضح كيفية دخول المستخدم إلى النظام والتحقق من هويته.

```mermaid
sequenceDiagram
    participant User as المستخدم
    participant Client as العميل (React)
    participant Server as الخادم (API)
    participant DB as قاعدة البيانات

    User->>Client: إدخال بيانات الدخول
    Client->>Server: إرسال (Email, Password)
    Server->>DB: البحث عن المستخدم
    DB-->>Server: بيانات المستخدم (أو خطأ)
    Server-->>Server: التحقق من كلمة المرور وتوليد JWT Token
    Server-->>Client: إرسال Token + بيانات المستخدم
    Client-->>Client: حفظ Token في localStorage/Context
    Client->>User: السماح بالوصول للوحة التحكم
```

---

## 3. منطق المحرر (Editor Logic Flow)

يوضح كيفية عمل محرر المواقع بخاصية "السحب والإفلات" (Drag and Drop).

```mermaid
flowchart LR
    Start([بدء التعديل]) --> Sidebar[قائمة المكونات Sidebar]
    Sidebar --> Drag{سحب مكون}
    Drag --> Canvas[منطقة العمل Canvas]
    Canvas --> Select{تحديد مكون}
    Select --> Properties[تغيير الخصائص - لون، نص، صورة]
    Properties --> State[تحديث حالة المحرر - Editor State]
    State --> Preview[معاينة فورية]
    Preview --> Save([حفظ المشروع])
```

![منطق المحرر](./images/editor_logic.png)

---

## 4. دورة حياة حفظ المشروع (Project Saving Workflow)

يوضح كيفية انتقال البيانات من حالة المتصفح إلى التخزين الدائم.

```mermaid
graph TD
    State[Editor State - JSON] --> Payload[إنشاء حمولة البيانات Payload]
    Payload --> API[إرسال طلب POST/PUT إلى /api/projects]
    API --> Middleware[التحقق من Token المستخدم]
    Middleware --> Controller[معالجة البيانات في الخادم]
    Controller --> DB_Find{هل المشروع موجود؟}
    DB_Find -- نعم --> Update[تحديث السجل الحالي]
    DB_Find -- لا --> Create[إنشاء سجل جديد]
    Update --> Response(إرجاع رسالة نجاح/فشل)
    Create --> Response
    Response --> UI[تحديث واجهة المستخدم]
```

![دورة حياة حفظ المشروع](./images/save_workflow.png)

---

## 5. رفع الملفات والصور (Media Upload Flow)

```mermaid
flowchart TD
    A[اختيار صورة من المحرر] --> B{رفع ملف جديد؟}
    B -- نعم --> C[إرسال FormData إلى /api/upload]
    C --> D[تلقي الخادم للملف - Multer]
    D --> E[حفظ الملف في ملفات Local Storage]
    E --> F[إرجاع رابط الصورة للمحرر]
    B -- لا --> G[اختيار رابط خارجي]
    F --> H[تحديث خاصية الصورة في المكون]
    G --> H
```
