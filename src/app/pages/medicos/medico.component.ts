import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital;
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      const id = params['id'];

      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
  }

  cargarMedicos() {

    return this._medicoService.cargarMedicos()
      .subscribe(medicos => {
        this.medico = medicos;
        this.medico.hospital = medicos.hospital._id;
        this.cambioHospital(this.medico.hospital);
      });
  }

  cargarMedico( id: string ) {
    this._medicoService.cargarMedico(id)
      .subscribe((medico) => this.medico = medico);
  }

  guardarMedico(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico)
      .subscribe(medico => {

        console.log(medico);

        this.medico._id = medico._id;
        this.router.navigate(['/medico', medico._id]);

      });

  }


  cambioHospital(id: string) {

    this._hospitalService.obtenerHospital( id )
      .subscribe(hospital => {
        this.hospital = hospital;
        console.log(hospital);

    });


  }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
      .subscribe( hospitales => this.hospitales = hospitales);
  }

}
