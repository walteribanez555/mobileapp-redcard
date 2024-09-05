import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonIcon,
  IonText,
  IonFabButton,
  IonBadge,
  IonRow,
  IonCol,
  IonSearchbar,
  IonicSlides,
  IonListHeader,
  IonList,
  IonCard,
  IonFooter,
  IonButtons,
  IonButton,
  IonBackButton,
  IonChip,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowForwardOutline,
  checkmarkCircle,
  linkOutline,
  locateOutline,
  locationOutline,
  logOutOutline,
  notificationsOutline,
  optionsOutline,
  personCircleOutline,
  reloadOutline,
} from 'ionicons/icons';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PolizasService } from '../data/services/crm/polizas.service';
import { BeneficiariosService } from '../data/services/crm/beneficiarios.service';
import { VentasService } from '../data/services/crm/ventas.service';
import { switchMap, tap } from 'rxjs';
import { Poliza } from '../data/models/Poliza.model';
import { Venta } from '../data/models/Venta.model';
import { Beneficiario } from '../data/models/Beneficiario.model';
import { ServicioCRM } from '../data/models/ServicioCRM.model';
import { ServicioService } from '../data/services/crm/servicio.service';

@Component({
  selector: 'app-my-voucher',
  standalone: true,
  imports: [
    IonChip,
    IonBackButton,
    CommonModule,
    IonButtons,
    IonFooter,
    IonCard,
    IonList,
    IonListHeader,
    IonSearchbar,
    IonCol,
    IonRow,
    IonBadge,
    IonFabButton,
    IonText,
    IonIcon,
    IonLabel,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    RouterLink,
    DatePipe,
    IonBackButton,
    IonButton,
    IonChip,
  ],
  templateUrl: './my-voucher.component.html',
  styleUrls: ['./my-voucher.component.scss'],
})
export class MyVoucherComponent implements OnInit {
  private polizaService = inject(PolizasService);
  private beneficiarioService = inject(BeneficiariosService);
  private servicioCRMService = inject(ServicioService);
  private ventaService = inject(VentasService);
  private activeRoute = inject(ActivatedRoute);

  beneficiario_id: number | null = null;
  venta_id: number | null = null;
  poliza_id: number | null = null;

  poliza: Poliza | null = null;
  venta: Venta | null = null;
  beneficiario: Beneficiario | null = null;

  plan :ServicioCRM | null = null;

  isloading : boolean = false;

  constructor() {
    addIcons({
      locateOutline,
      notificationsOutline,
      optionsOutline,
      locationOutline,
      arrowForwardOutline,
      linkOutline,
      personCircleOutline,
      logOutOutline,
      checkmarkCircle,
      reloadOutline,
    });
  }
  ngOnInit(): void {
    this.isloading = true;
    const { venta_id, beneficiario_id } = this.activeRoute.snapshot.queryParams;
    const { id } = this.activeRoute.snapshot.params;

    this.venta_id = venta_id;
    this.beneficiario_id = beneficiario_id;
    this.poliza_id = id;

    this.polizaService
      .getOne(this.poliza_id!)
      .pipe(
        switchMap((polizas: Poliza[]) => {
          this.poliza = polizas[0];
          return this.servicioCRMService.getOne(this.poliza!.servicio_id);
        }),
        switchMap((service :ServicioCRM[]) => {
          this.plan = service[0];
          return this.ventaService.getOne(this.venta_id!);
        }),
        switchMap((ventas: Venta[]) => {
          this.venta = ventas[0];
          return this.beneficiarioService.getOne(this.poliza_id!);
        })
      )
      .subscribe({
        next: (resp) => {
          this.beneficiario = resp[0];

          this.isloading=false;
        },
        error: (err) => {},
        complete: () => {},
      });
  }


  getStatusPoliza() {

    if(this.poliza && this.poliza.status < 3 ) {
      const actualDate = new Date();
      const outDate = new Date(this.poliza.fecha_salida.split('T')[0]);
      const returnDate = new Date(this.poliza.fecha_retorno.split('T')[0]);
      const expireDate = new Date(this.poliza.fecha_caducidad.split('T')[0]);


      if((actualDate > returnDate && this.poliza.multiviaje == 1) || (this.poliza.multiviaje > 1 && actualDate > expireDate)) {
        return "vencida"
      }


      if(actualDate > outDate){
        return "activa";
      }

    }


  switch (this.poliza?.status) {
    case 1:
      return 'proceso';
    case 2:
      return 'espera';
    case 3:
      return 'activa';
    case 4:
      return 'congelada';
    case 5:
      return 'reembolso';
    case 6:
      return 'anulada';
    default:
      return 'vencida';
  }
}


  loadVoucher() {
    window.open(`https://redcardassist.com.bo/confirm?polizas=${this.poliza?.poliza_id}`, '_blank');
  }
}
