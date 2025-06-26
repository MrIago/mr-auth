# 🎨 mr-auth

Zero-config authentication management system for React/Next.js with Firebase.

Built and tested on Next.js 15 with React 19.

## ✨ Features

- 🚀 **Zero Config**: Works immediately after installation
- ⚡ **SSR Ready**: Full Server-Side Rendering support
- 🔒 **Multi-level Security**: Quick, Secure, and Critical operations
- 👥 **Role System**: Admin, Professor, Student
- 💎 **Plan System**: Free, Premium, and more
- 🍪 **Cookie Management**: Secure httpOnly cookies
- 🎯 **TypeScript First**: Complete typing included
- 🧩 **Ready Components**: AuthGuard, LoginButton, LogoutButton
- 🪝 **Optimized Hooks**: useAuth, useIsAdmin, useHasPlan and more

## 📦 Installation

```bash
npm install zustand firebase firebase-admin
```

## ⚙️ Setup

### 1. Configure Firebase

Create Firebase configuration files:

```typescript
// @/firebase/firebase-client.ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  // your configuration
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
```

```typescript
// @/firebase/firebase-admin.ts
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

if (!getApps().length) {
  initializeApp({
    credential: cert({
      // your admin credentials
    })
  })
}

export const adminAuth = getAuth()
export const adminDb = getFirestore()
```

### 2. Configure Main Layout

```tsx
// app/layout.tsx
import { AuthProvider, getUserFromCookie } from '@/lib/mr-auth'

export default async function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const initialUser = await getUserFromCookie()
  
  return (
    <html>
      <body>
        <AuthProvider initialUser={initialUser}>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

## 🚀 Basic Usage

### Main Hook

```tsx
import { useAuth } from '@/lib/mr-auth'

export default function MyComponent() {
  const { 
    user,           // User data
    isLoading,      // Loading state
    isAuthenticated,// Whether authenticated
    login,          // Login function
    logout          // Logout function
  } = useAuth()

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Hello, {user?.name}!</p>
          <button onClick={logout}>Sign Out</button>
        </div>
      ) : (
        <button onClick={login}>Sign In with Google</button>
      )}
    </div>
  )
}
```

### Ready Components

```tsx
import { 
  LoginButton, 
  LogoutButton, 
  AuthGuard,
  UserBtn 
} from '@/lib/mr-auth'

export default function Dashboard() {
  return (
    <div>
      <UserBtn />
      
      {/* Protected area - logged users only */}
      <AuthGuard fallback={<LoginButton />}>
        <div>Protected content</div>
      </AuthGuard>

      {/* Admin area */}
      <AuthGuard 
        requiredRole="admin" 
        fallback={<div>Access denied</div>}
      >
        <AdminPanel />
      </AuthGuard>

      {/* Premium area */}
      <AuthGuard 
        requiredPlan="premium" 
        fallback={<UpgradePrompt />}
      >
        <PremiumFeature />
      </AuthGuard>
    </div>
  )
}
```

### Specialized Hooks

```tsx
import { 
  useIsAdmin,
  useHasPaidPlan,
  useHasRole 
} from '@/lib/mr-auth'

export default function ConditionalContent() {
  const isAdmin = useIsAdmin()
  const hasPaidPlan = useHasPaidPlan()
  const isProfessor = useHasRole('professor')

  return (
    <div>
      {isAdmin && <AdminMenu />}
      {hasPaidPlan && <PremiumContent />}
      {isProfessor && <TeacherTools />}
    </div>
  )
}
```

## 🔒 Server-Side Functions

### Quick Operations

For UI/UX and conditional rendering (~2ms):

```tsx
import { 
  getUserFromCookie,
  isAdmin,
  hasPaidPlan 
} from '@/lib/mr-auth'

// In Server Components
export default async function ServerComponent() {
  const user = await getUserFromCookie()
  const adminStatus = await isAdmin()
  
  return (
    <div>
      {user && <p>Hello, {user.name}</p>}
      {adminStatus && <AdminControls />}
    </div>
  )
}
```

### Secure Operations

For important operations with session validation:

```tsx
import { 
  getUserFromSession,
  hasValidSession,
  hasPermission 
} from '@/lib/mr-auth'

// In API Routes
export async function GET() {
  const isValid = await hasValidSession()
  if (!isValid) {
    return new Response('Unauthorized', { status: 401 })
  }

  const user = await getUserFromSession()
  return Response.json({ user })
}
```

### Critical Operations

For sensitive operations with extra validation:

```tsx
import { validateCriticalOperation } from '@/lib/mr-auth'

// For critical operations like delete, payments, etc.
export async function DELETE() {
  const validation = await validateCriticalOperation({
    requiredRole: 'admin',
    requiredPlan: 'premium'
  })

  if (!validation.success) {
    return new Response(validation.error, { status: 403 })
  }

  // Proceed with critical operation
  return Response.json({ success: true })
}
```

## 📋 TypeScript Types

```typescript
// User
interface User {
  role: 'admin' | 'professor' | 'aluno'
  plan: string
  name: string
  email: string
  photo: string
}

// Authentication states
type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'
```

## 🎯 Available Hooks

### State
- `useAuth()` - Main hook with complete state
- `useIsAuthenticated()` - Whether authenticated
- `useIsLoading()` - Loading state
- `useUser()` - Current user data

### Roles
- `useHasRole(role)` - Check specific role
- `useIsAdmin()` - Whether is admin
- `useIsProfessor()` - Whether is professor

### Plans
- `useHasPlan(plan)` - Check specific plan
- `useHasPaidPlan()` - Whether has paid plan

### Protection
- `useAuthGuard(options)` - Hook for custom protection

## 🔧 Components

### AuthProvider
Main wrapper that manages global state.

### AuthGuard
Component for conditional content protection.

### Buttons
- `LoginButton` - Styled login button
- `LogoutButton` - Logout button
- `UserBtn` - User avatar/menu

### Utilities
- `CheckAuth` - Component for automatic verification

## 🏗️ Architecture

### Client-side
- **Zustand Store**: Reactive state management
- **Hooks**: Simple interface for components
- **Components**: Ready-to-use UI

### Server-side
- **Quick**: Cookie-based operations (fast)
- **Secure**: Operations with session validation
- **Critical**: Extra validation for sensitive operations

### Integration
- **Firebase Auth**: Google authentication
- **httpOnly Cookies**: Secure storage
- **SSR/SSG**: Full Next.js support

## 📝 Usage Examples

### Programmatic Login/Logout
```tsx
const { login, logout } = useAuth()

const handleLogin = async () => {
  const result = await login()
  if (result) {
    // Redirect based on role
    router.push('/dashboard')
  }
}
```

### Route Protection
```tsx
// middleware.ts
import { hasValidSession } from '@/lib/mr-auth'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const isValid = await hasValidSession()
    if (!isValid) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}
```

### Conditional Rendering
```tsx
const user = await getUserFromCookie()

return (
  <nav>
    {user?.role === 'admin' && <AdminLink />}
    {user?.plan !== 'free' && <PremiumFeatures />}
  </nav>
)
```

## 🚨 Security

### Operation Levels

1. **Quick** (~2ms): For UI/UX, using cookies
2. **Secure** (~50ms): For important operations, validating session
3. **Critical** (~100ms): For sensitive operations, extra validation

### Best Practices

- Use **Quick** for rendering and navigation
- Use **Secure** for APIs and important operations
- Use **Critical** for sensitive operations (delete, payments)
- Always validate critical operations on the server

## 📄 License

MIT - See [LICENSE](LICENSE) file for details.

---

Built with ❤️ for modern React/Next.js applications. 