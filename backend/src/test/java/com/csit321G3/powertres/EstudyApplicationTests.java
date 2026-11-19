package com.csit321G3.powertres;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class EstudyApplicationTests {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Test
	void contextLoads() {
	}

	@Test
	void studentProfileFieldsAllowNullDuringRegistration() {
		Integer nullableColumns = jdbcTemplate.queryForObject(
				"SELECT COUNT(*) FROM information_schema.columns "
						+ "WHERE table_schema = DATABASE() AND table_name = 'student' "
						+ "AND column_name IN ('section', 'year_level') AND is_nullable = 'YES'",
				Integer.class);

		assertEquals(2, nullableColumns);
	}
}
