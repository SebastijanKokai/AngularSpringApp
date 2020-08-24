package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Sektor;
import rva.reps.SektorRepository;

@RestController
@CrossOrigin
@Api(tags = { "Radnik CRUD operacije" })
public class SektorRestController {

	@Autowired
	private SektorRepository sektorRepository;

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@GetMapping("/sektor")
	@ApiOperation(value = "Vraca kolekciju sektora iz baze podataka")
	public Collection<Sektor> getAll() {
		return sektorRepository.findAll();
	}

	@GetMapping("/sektor/{id}")
	@ApiOperation(value = "Vraca sektor iz baze podataka po ID-u")
	public Sektor getSektor(@PathVariable("id") Integer id) {
		return sektorRepository.getOne(id);
	}

	@GetMapping("/sektor/naziv/{naziv}")
	@ApiOperation(value = "Vraca kolekciju sektora iz baze podataka po nazivu")
	public Collection<Sektor> getByNaziv(@PathVariable("naziv") String naziv) {
		return sektorRepository.findByNazivContainingIgnoreCase(naziv);
	}

	@PostMapping("/sektor")
	@CrossOrigin
	@ApiOperation(value = "Dodaje sektor u baze podataka")
	public ResponseEntity<HttpStatus> addSektor(@RequestBody Sektor sektor) {
		if (!sektorRepository.existsById(sektor.getId())) {
			sektorRepository.save(sektor);
			return new ResponseEntity<HttpStatus>(HttpStatus.CREATED);
		}
		return new ResponseEntity<HttpStatus>(HttpStatus.CONFLICT);
	}

	@PutMapping("/sektor/")
	@CrossOrigin
	@ApiOperation(value = "Modifikuje sektor u bazi podataka po ID-u")
	public ResponseEntity<HttpStatus> updateSektor(@RequestBody Sektor sektor) {

		if (!sektorRepository.existsById(sektor.getId()))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		
		sektorRepository.save(sektor);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping("/sektor/{id}")
	@CrossOrigin
	@ApiOperation(value = "Brise sektor iz baze podataka po ID-u")
	public ResponseEntity<HttpStatus> delete(@PathVariable("id") Integer id) {

		if (!sektorRepository.existsById(id)) {
			return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
		}

		sektorRepository.deleteById(id);

		if (id == -100) {
			jdbcTemplate.execute("INSERT INTO \"sektor\"(\"id\", \"naziv\", \"oznaka\", \"preduzece\") "
					+ "VALUES (-100, 'Sektor I1', 'I1', 3)");
		}
		return new ResponseEntity<HttpStatus>(HttpStatus.OK);

	}

}
