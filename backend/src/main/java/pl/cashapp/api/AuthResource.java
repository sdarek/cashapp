package pl.cashapp.api;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.mindrot.jbcrypt.BCrypt;
import pl.cashapp.dto.LoginRequest;
import pl.cashapp.dto.RegisterRequest;
import pl.cashapp.model.User;
import pl.cashapp.repository.UserRepository;
import pl.cashapp.security.GenerateToken;

import java.time.LocalDateTime;
import java.util.Map;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    @Inject
    UserRepository userRepository;
    @Inject
    GenerateToken tokenGenerator;

    @POST
    @Path("/register")
    @Transactional
    public void register(RegisterRequest request) {
        if (userRepository.findByEmail(request.email) != null) {
            throw new WebApplicationException("Email zajęty", 400);
        }

        User user = new User();
        user.email = request.email;
        user.passwordHash = BCrypt.hashpw(request.password, BCrypt.gensalt());
        user.role = "USER";
        user.createdAt = LocalDateTime.now();

        userRepository.persist(user);
    }
}
