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
import rva.jpa.Radnik;
import rva.jpa.Sektor;
import rva.reps.ObrazovanjeRepository;
import rva.reps.RadnikRepository;
import rva.reps.SektorRepository;

@RestController
@CrossOrigin
@Api(tags = { "Radnik CRUD operacije" })
public class RadnikRestController {

	@Autowired
	private RadnikRepository radnikRepository;

	@Autowired
	private SektorRepository sektorRepository;

	@Autowired
	private ObrazovanjeRepository obrazovanjeRepository;

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@GetMapping("/radnik")
	@ApiOperation(value = "Vraca kolekciju radnika iz baze podataka")
	public Collection<Radnik> getAll() {
		return radnikRepository.findAll();
	}

	@GetMapping("/radnik/{id}")
	@ApiOperation(value = "Vraca radnika iz baze podataka po ID-u")
	public Radnik getRadnik(@PathVariable("id") Integer id) {
		return radnikRepository.getOne(id);
	}

	@GetMapping("/radnik/obrazovanje/{id}")
	@ApiOperation(value = "Vraca kolekciju radnika iz baze podataka po obrazovanju")
	public Collection<Radnik> getByObrazovanje(@PathVariable("id") Integer id) {
		Obrazovanje obrazovanje = obrazovanjeRepository.getOne(id);
		return radnikRepository.findByObrazovanje(obrazovanje);
	}
	
	@GetMapping("/radnik/sektor/{id}")
	@ApiOperation(value = "Vraca kolekciju radnika iz baze podataka po sektoru")
	public Collection<Radnik> getBySektor(@PathVariable("id") Integer id) {
		Sektor sektor = sektorRepository.getOne(id);
		return radnikRepository.findBySektor(sektor);
	}

	@PostMapping("/radnik")
	@ApiOperation(value = "Dodaje radnika u bazu podataka")
	public ResponseEntity<HttpStatus> addRadnik(@RequestBody Radnik radnik) {

		if (radnikRepository.existsById(radnik.getId())) {
			return new ResponseEntity<HttpStatus>(HttpStatus.CONFLICT);
		}
		
		radnikRepository.save(radnik);
		return new ResponseEntity<HttpStatus>(HttpStatus.CREATED);

	}

	@PutMapping("/radnik/")
	@ApiOperation(value = "Modifikuje radnika iz baze podataka po ID-u")
	public ResponseEntity<HttpStatus> updateRadnik(@RequestBody Radnik radnik) {

		if (!radnikRepository.existsById(radnik.getId()))
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		
		radnikRepository.save(radnik);
		return new ResponseEntity<>(HttpStatus.OK);

	}

	@DeleteMapping("/radnik/{id}")
	@ApiOperation(value = "Brise radnika iz baze podataka po ID-u")
	public ResponseEntity<HttpStatus> deleteRadnik(@PathVariable("id") Integer id) {

		if (!radnikRepository.existsById(id)) {
			return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
		}

		radnikRepository.deleteById(id);

		// testiranje
		if (id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO \"radnik\"(\"id\", \"ime\", \"prezime\", \"broj_lk\", \"obrazovanje\", \"sektor\") "
							+ "VALUES (-100, 'Milos', 'Milivojevic', 111, 1, 1);");
		}

		return new ResponseEntity<HttpStatus>(HttpStatus.OK);

	}

}
