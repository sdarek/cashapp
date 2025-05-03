package pl.cashapp.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import pl.cashapp.model.User;

@ApplicationScoped
public class UserRepository implements PanacheRepository<User> {

}
