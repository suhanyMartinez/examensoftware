# Freelancer Marketplace MVP

**Estado:** ✅ MVP Funcional - Listo para Despliegue

## 📋 Descripción del Proyecto

Una plataforma marketplace de freelance que conecta **Clientes** con **Freelancers** para la ejecución de proyectos. Incluye sistema de propuestas, contratos, comunicación y calificaciones.

---

## 🎯 Funcionalidades Implementadas

### Sprint 1: Autenticación y Gestión de Usuarios
- ✅ Registro de usuarios (Cliente/Freelancer)
- ✅ Login con credenciales
- ✅ Gestión de sesiones con NextAuth
- ✅ Perfil de usuario con información

### Sprint 2: Publicación y Gestión de Proyectos
- ✅ CRUD de proyectos (Crear, Leer, Actualizar, Eliminar)
- ✅ Listado de proyectos con filtros
- ✅ Filtro por categoría
- ✅ Estados de proyecto (ACTIVE, COMPLETED, CLOSED, CANCELLED)

### Sprint 3: Propuestas
- ✅ Búsqueda de proyectos disponibles
- ✅ Sistema de propuestas de freelancers
- ✅ Visualización de propuestas recibidas (cliente)
- ✅ Visualización de propuestas enviadas (freelancer)
- ✅ Aceptar/Rechazar propuestas

### Sprint 4: Contratación y Comunicación
- ✅ Creación automática de contratos
- ✅ Gestión de estados de contrato
- ✅ Chat integrado en contratos
- ✅ Mensajería en tiempo real (polling)

### Sprint 5: Calificaciones y Reputación
- ✅ Sistema de calificaciones (1-5 estrellas)
- ✅ Comentarios en calificaciones
- ✅ Cálculo de promedio de rating
- ✅ Perfil público con reputación
- ✅ Protección: solo contratos completados se pueden calificar

---

## 🏗️ Stack Tecnológico

**Frontend:**
- Next.js 16 (App Router)
- React 19
- TailwindCSS 4
- Client-side authentication con NextAuth

**Backend:**
- Next.js API Routes
- Prisma 7 (ORM)
- PostgreSQL (Supabase/Local)

**Autenticación:**
- NextAuth v4
- Credentials Provider
- bcryptjs para contraseñas

**Base de Datos:**
- PostgreSQL
- Prisma Migrations
- 11 modelos relacionales

---

## 📊 Modelos de Base de Datos

```
User (Cliente/Freelancer)
├── Projects (como cliente)
├── Proposals (como freelancer)
├── Contracts (como cliente/freelancer)
├── Messages (enviados/recibidos)
└── Reviews (dados/recibidos)

Project
├── Proposals
├── Contracts
└── Client (User)

Proposal
├── Freelancer (User)
├── Client (User)
├── Project
└── Contract

Contract
├── Client (User)
├── Freelancer (User)
├── Project
├── Proposal
├── Messages
└── Review

Message
├── Contract
├── Sender (User)
└── Receiver (User)

Review
├── Contract
├── Reviewer (User)
└── Reviewee (User)
```

---

## 🚀 Guía de Instalación y Ejecución

### Prerequisitos
- Node.js 18+
- npm o yarn
- PostgreSQL (local o Supabase)

### Pasos de Instalación

1. **Clonar repositorio**
```bash
cd examenseminario
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de ambiente**
Crear `.env.local`:
```
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXTAUTH_SECRET="tu-secret-aqui"
```

4. **Sincronizar base de datos**
```bash
npx prisma generate
npx prisma db push
```

5. **Ejecutar servidor de desarrollo**
```bash
npm run dev
```

6. **Acceder a la aplicación**
Abrir: `http://localhost:3000`

---

## 🧪 Pruebas Manuales

### Test Flow - Cliente

1. **Registrarse como Cliente**
   - Ir a `/register`
   - Llenar formulario
   - Seleccionar rol: "Cliente"
   - Verificar acceso a panel

2. **Crear Proyecto**
   - Ir a `/projects`
   - Click "Crear Proyecto"
   - Llenar detalles (título, descripción, presupuesto)
   - Seleccionar categoría
   - Guardar

3. **Gestionar Propuestas**
   - Ir a `/proposals` → tab "Propuestas Recibidas"
   - Ver propuestas de freelancers
   - Aceptar una propuesta
   - Verificar que contrato se creó automáticamente

4. **Usar Contrato**
   - Ir a `/contracts`
   - Abrir contrato
   - Enviar mensaje a freelancer
   - Marcar como "Completado"
   - Calificar al freelancer

5. **Ver Perfil Público**
   - Click "Ver Perfil Público"
   - Verificar rating mostrado

### Test Flow - Freelancer

1. **Registrarse como Freelancer**
   - Ir a `/register`
   - Seleccionar rol: "Freelancer"

2. **Explorar Proyectos**
   - Ir a `/browse`
   - Filtrar por categoría
   - Buscar proyectos

3. **Enviar Propuesta**
   - Click en proyecto
   - Click "Enviar Propuesta"
   - Llenar título, descripción, presupuesto
   - Enviar

4. **Seguimiento**
   - Ir a `/proposals` → tab "Propuestas Enviadas"
   - Ver estado de propuesta
   - Si es aceptada, ir a `/contracts`

5. **Calificar Cliente**
   - Cuando contrato está completado
   - Ir al contrato
   - Calificar y comentar

---

## 📱 Rutas Principales

### Públicas
- `/` - Home
- `/login` - Login
- `/register` - Registro
- `/profiles/[id]` - Perfil público

### Autenticadas - Cliente
- `/profile` - Mi perfil
- `/projects` - Mis proyectos
- `/projects/new` - Crear proyecto
- `/projects/[id]` - Detalle proyecto
- `/projects/[id]/edit` - Editar proyecto
- `/proposals` - Propuestas recibidas
- `/proposals/[id]` - Detalle propuesta
- `/contracts` - Mis contratos
- `/contracts/[id]` - Detalle contrato + chat

### Autenticadas - Freelancer
- `/profile` - Mi perfil
- `/browse` - Explorar proyectos
- `/browse/projects/[id]` - Detalle proyecto
- `/proposals` - Mis propuestas
- `/proposals/[id]` - Detalle propuesta
- `/contracts` - Mis contratos
- `/contracts/[id]` - Detalle contrato + chat

---

## 🔐 Seguridad Implementada

- ✅ Validación de sesión en rutas protegidas
- ✅ Autorización: solo dueños pueden editar/eliminar
- ✅ Solo freelancers pueden enviar propuestas
- ✅ Solo clientes pueden aceptar/rechazar
- ✅ Chat protegido: solo participantes pueden acceder
- ✅ Reviews: solo contratos completados
- ✅ Contraseñas hasheadas con bcryptjs
- ✅ CSRF tokens en NextAuth

---

## 📈 Métricas de Desarrollo

| Aspecto | Estado |
|---------|--------|
| APIs Implementadas | 15+ endpoints |
| Componentes React | 12+ reutilizables |
| Páginas | 18+ rutas |
| Modelos Prisma | 11 modelos |
| Testing Manual | ✅ Completado |
| Validaciones | ✅ Client + Server |

---

## 🚢 Despliegue

### Opciones de Hosting

1. **Vercel (Recomendado)**
   ```bash
   vercel deploy
   ```

2. **Railway**
   - Conectar repositorio
   - Configurar variables de ambiente
   - Deploy automático

3. **Render**
   - Crear servicio
   - Conectar GitHub
   - Desplegar

### Preparación para Producción

1. **Variables de Ambiente**
   ```
   NODE_ENV=production
   NEXTAUTH_URL=https://tu-dominio.com
   DATABASE_URL=<producción>
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Verificar Build**
   ```bash
   npm run start
   ```

---

## 🔄 Flujo Completo de Transacción

```
Cliente Crea Proyecto
         ↓
Freelancer Explora Proyectos
         ↓
Freelancer Envía Propuesta
         ↓
Cliente Revisa Propuesta
         ↓
Cliente Acepta → Contrato Automático
         ↓
Ambos Comunican en Chat
         ↓
Marcan Completado
         ↓
Ambos Califican Mutuamente
         ↓
Reputación Actualizada
```

---

## ❓ Preguntas Frecuentes

**¿Cómo cambiar de rol?**
- No es posible cambiar rol después de registrarse. Crear nueva cuenta con otro rol.

**¿Puedo enviar múltiples propuestas?**
- No, solo una propuesta por freelancer por proyecto.

**¿Qué pasa si rechazo una propuesta?**
- La propuesta se marca como REJECTED pero el proyecto sigue ACTIVE.

**¿Puedo cancelar un contrato?**
- Sí, ambas partes pueden cambiar estado a CANCELLED.

**¿Necesito completar antes de calificar?**
- Sí, solo contratos COMPLETED se pueden calificar.

---

## 📞 Soporte

Para reportar bugs o sugerencias, crear un issue en el repositorio.

---

## 📄 Licencia

Proyecto académico - Seminario Taller de Software 2026

---

**Última actualización:** 2026-06-10
**Versión:** 1.0.0-MVP
**Status:** ✅ Producción Lista
