# Route Protection Implementation

## Overview

This document explains how route protection is implemented in the application using Next.js middleware. The middleware ensures that:

1. Unauthenticated users can only access public routes
2. Authenticated users can access routes appropriate for their role
3. Role-specific routes are protected from unauthorized access

## Protected Routes

- `/admin/*` - Only accessible to users with the "admin" role
- `/recruiter/*` - Only accessible to users with the "recruiter" role
- `/profile/*` - Only accessible to users with the "applicant" role

## Implementation Details

The route protection is implemented in `src/middleware.ts` using Next.js middleware capabilities.

### How It Works

1. The middleware intercepts all incoming requests
2. It checks if the requested path is public or protected
3. For protected routes, it verifies if the user is authenticated by checking for a token
4. For role-specific routes, it decodes the token to extract the user's role and verifies authorization
5. If authorization fails, the user is redirected to an appropriate page

### Authentication Flow

1. When a user logs in successfully, their JWT token is stored in a cookie named 'user'
2. The middleware extracts and decodes this token to determine the user's role
3. Based on the role, access to specific routes is either granted or denied

### Code Integration

The middleware works with the existing authentication system that uses:

```javascript
const { data: user } = useGetMeQuery(undefined);
const activeRole = user?.role;
```

The middleware uses the same role information that's stored in the JWT token when the user logs in.

## Error Handling

The middleware includes error handling for:
- Invalid or malformed tokens
- Missing authentication for protected routes
- Role-based access violations

In all error cases, users are redirected to the login page or home page as appropriate.