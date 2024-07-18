import org.springframework.data.jpa.repository.JpaRepository;

public interface taskrepository extends JpaRepository<Task, Long> {
}