import org.hibernate.dialect.Dialect;
import java.sql.Types;

public class SQLiteDialect extends Dialect {

    public SQLiteDialect() {
        registerColumnType(Types.INTEGER, "integer");
        registerColumnType(Types.VARCHAR, "text");
        registerColumnType(Types.BLOB, "blob");
        registerColumnType(Types.REAL, "real");
    }

    @Override
    public boolean dropConstraints() {
        return false;
    }

    // Other methods as required for SQLite syntax, such as identity columns
}

