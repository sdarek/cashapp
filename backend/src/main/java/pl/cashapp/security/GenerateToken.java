package pl.cashapp.security;

import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import pl.cashapp.model.User;

import java.time.Duration;

@ApplicationScoped
public class GenerateToken {
    public String generate(User user) {
        return Jwt.issuer("https://example.com/issuer")
                .upn(user.email)
                .groups(user.role)
                .expiresIn(Duration.ofHours(1))
                .sign();
    }
}
