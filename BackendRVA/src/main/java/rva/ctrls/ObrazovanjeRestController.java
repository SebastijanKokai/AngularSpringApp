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
import rva.jpa.Obrazovanje;
import rva.reps.ObrazovanjeRepository;

@RestController
@CrossOrigin
@Api(tags = { "Obrazovanje CRUD operacije" })
public class ObrazovanjeRestController {

	@Autowired
	ObrazovanjeRepository obrazovanjeRepository;

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@GetMapping("/obrazovanje")
	@ApiOperation(value = "Vraca kolekciju obrazovanja iz baze podataka")
	public Collection<Obrazovanje> getAll() {
		return obrazovanjeRepository.findAll();
	}

	@GetMapping("/obrazovanje/{id}")
	@ApiOperation(value = "Vraca obrazovanje po id-u iz baze podataka")
	public Obrazovanje getOne(@PathVariable("id") Integer id) {
		return obrazovanjeRepository.getOne(id);
	}

	@GetMapping("/obrazovanje/naziv/{naziv}")
	@ApiOperation(value = "Vraca kolekciju obrazovanja iz baze podataka po imenu")
	public Collection<Obrazovanje> getByNaziv(@PathVariable("naziv") String naziv) {
		return obrazovanjeRepository.findByNazivContainingIgnoreCase(naziv);
	}

	@PostMapping("/obrazovanje")
	@CrossOrigin
	@ApiOperation(value = "Unosi obrazovanje u bazu podataka")
	public ResponseEntity<HttpStatus> addObrazovanje(@RequestBody Obrazovanje obrazovanje) {
		try {
			if (!obrazovanjeRepository.existsById(obrazovanje.getId())) {
				obrazovanjeRepository.save(obrazovanje);
				return new ResponseEntity<>(HttpStatus.CREATED);
			}
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
	}

	@PutMapping("/obrazovanje/")
	@CrossOrigin
	@ApiOperation(value = "Modifikuje obrazovanje po ID-u iz baze podataka")
	public ResponseEntity<HttpStatus> updateObrazovanje(@RequestBody Obrazovanje obrazovanje) {

		if (!obrazovanjeRepository.existsById(obrazovanje.getId()))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		
		obrazovanjeRepository.save(obrazovanje);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping("/obrazovanje/{id}")
	@CrossOrigin
	@ApiOperation(value = "Brise obrazovanje po ID-u iz baze podataka")
	public ResponseEntity<HttpStatus> delete(@PathVariable("id") Integer id) {

		if (!obrazovanjeRepository.existsById(id)) {
			return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
		}

		obrazovanjeRepository.deleteById(id);

		if (id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO \"obrazovanje\"(\"id\", \"naziv\", \"opis\", \"stepen_strucne_spreme\") VALUES (-100, 'test', 'test', 'test') ");
		}

		return new ResponseEntity<HttpStatus>(HttpStatus.OK);

	}
}
