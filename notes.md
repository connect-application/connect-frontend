# Modification: CORS Configuration in WebSecurityConfig

## Overview

The modification involves adding Cross-Origin Resource Sharing (CORS) configuration to the `WebSecurityConfig` class in the Spring Boot application. This allows the frontend application to make requests to the backend application from a different origin (domain, scheme, or port).

## Implementation Details

The `WebSecurityConfig` class now implements `WebMvcConfigurer`, which provides a method `addCorsMappings` that we can override to add our CORS configuration.

```java
public class WebSecurityConfig implements WebMvcConfigurer {
```

In the `addCorsMappings` method, we configure CORS to allow requests from the frontend server address (`http://localhost:3000` in this case) to any endpoint (`/**`) in the backend application. We allow all common HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, `HEAD`, `OPTIONS`) and all headers (`*`). We also allow credentials, which means that cookies and HTTP authentication will work.

```java
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
            .allowedOrigins("http://localhost:3000") // replace with your frontend server address
            .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
}
```

This modification allows the frontend application to communicate with the backend application without running into CORS issues. Please note that the frontend server address should be replaced with the actual address when deploying the applications.
