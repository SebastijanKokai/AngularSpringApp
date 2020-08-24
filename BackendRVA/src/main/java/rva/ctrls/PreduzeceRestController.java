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
import rva.jpa.Preduzece;
import rva.reps.PreduzeceRepository;

@RestController
@CrossOrigin
@Api(tags = { "Preduzece CRUD operacije" })
public class PreduzeceRestController {

	@Autowired
	PreduzeceRepository preduzeceRepository;

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@GetMapping("/preduzece")
	@ApiOperation(value = "Vraca kolekciju preduzeca iz baze podataka")
	public Collection<Preduzece> getAll() {
		return preduzeceRepository.findAll();
	}

	@GetMapping("/preduzece/{id}")
	@ApiOperation(value = "Vraca preduzece iz baze podataka po ID-u")
	public Preduzece getOne(@PathVariable("id") Integer id) {
		return preduzeceRepository.getOne(id);
	}

	@GetMapping("/preduzece/naziv/{naziv}")
	@ApiOperation(value = "Vraca kolekciju preduzeca iz baze podataka po nazivu")
	public Collection<Preduzece> getByNaziv(@PathVariable("naziv") String naziv) {
		return preduzeceRepository.findByNazivContainingIgnoreCase(naziv);
	}

	@PostMapping("/preduzece")
	@ApiOperation(value = "Dodaje preduzece u bazu podataka")
	public ResponseEntity<HttpStatus> addPreduzece(@RequestBody Preduzece preduzece) {

		try {
			if (!preduzeceRepository.existsById(preduzece.getId())) {
				preduzeceRepository.save(preduzece);
				return new ResponseEntity<HttpStatus>(HttpStatus.CREATED);
			}
			return new ResponseEntity<HttpStatus>(HttpStatus.CONFLICT);
		} catch (Exception ex) {
			return new ResponseEntity<HttpStatus>(HttpStatus.CONFLICT);
		}

	}

	@PutMapping("/preduzece/")
	@ApiOperation(value = "Modifikuje preduzece iz baze podataka po ID-u")
	public ResponseEntity<HttpStatus> updatePreduzece(@RequestBody Preduzece preduzece) {
		
		if (!preduzeceRepository.existsById(preduzece.getId()))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		
		preduzeceRepository.save(preduzece);
		return new ResponseEntity<>(HttpStatus.OK);

	}

	@DeleteMapping("/preduzece/{id}")
	@ApiOperation(value = "Brise preduzece iz baze podataka po ID-u")
	public ResponseEntity<HttpStatus> deletePreduzece(@PathVariable("id") Integer id) {

		if (!preduzeceRepository.existsById(id)) {
			return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);

		}

		preduzeceRepository.deleteById(id);

		if (id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO \"preduzece\"(\"id\", \"naziv\", \"opis\", \"pib\", \"sediste\") VALUES (-100, 'test', 'test', 123, 'sediste') ");
		}

		return new ResponseEntity<HttpStatus>(HttpStatus.OK);

	}

}
