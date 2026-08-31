import { Elysia } from 'elysia';
import { cors } from '@elysia/cors';
import env from '../config/env';

export const securityHeaders = new Elysia({ name: 'security-headers' })
    .use(
        cors({
            origin: env.CORS_ORIGIN,
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        })
    )
    .onRequest(({ set }) => {
        // Permissions-Policy
        set.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()";

        // Security Headers (Helmet Equivalents)
        set.headers["X-Content-Type-Options"] = "nosniff";
        set.headers["X-Frame-Options"] = "SAMEORIGIN";
        set.headers["Strict-Transport-Security"] = "max-age=15552000; includeSubDomains";
        set.headers["Referrer-Policy"] = "no-referrer";
        
        // Helmet overrides from previous config
        set.headers["X-XSS-Protection"] = "0";
        set.headers["Cross-Origin-Embedder-Policy"] = "unsafe-none";

        // Content-Security-Policy
        set.headers["Content-Security-Policy"] = 
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline' cdn.jsdelivr.net; " +
            "style-src 'self' 'unsafe-inline' cdn.jsdelivr.net fonts.googleapis.com; " +
            "font-src 'self' fonts.scalar.com data:; " +
            "img-src 'self' data: cdn.jsdelivr.net; " +
            "connect-src 'self'; " +
            "object-src 'none'; " +
            "base-uri 'self'; " +
            "frame-ancestors 'none'; " +
            "form-action 'self'; " +
            "upgrade-insecure-requests;";
    });