package rva.reps;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import rva.jpa.Obrazovanje;
import rva.jpa.Radnik;
import rva.jpa.Sektor;

public interface RadnikRepository extends JpaRepository<Radnik, Integer>{

	Collection<Radnik> findByObrazovanje(Obrazovanje obrazovanje);
	Collection<Radnik> findBySektor(Sektor sektor);
	
	@Query(value = "SELECT COALESCE(broj_radnika+1, 1) FROM SEKTOR WHERE id = ?1", nativeQuery = true)
	Integer nextRbr(Integer sektorId);
}
