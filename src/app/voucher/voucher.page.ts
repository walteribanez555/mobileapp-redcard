import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowForwardOutline,
  linkOutline,
  locateOutline,
  locationOutline,
  logOutOutline,
  notificationsOutline,
  optionsOutline,
  personCircleOutline,
  reloadOutline,
} from 'ionicons/icons';
import { Category } from '../interfaces/category.interface';
import { Event } from '../interfaces/event.interface';
import { events } from '../data/events';
import { categories } from '../data/categories';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../data/services/auth/auth.service';
import { LinkService } from '../data/services/dashboard/link.service';
import { ServicioService } from '../data/services/crm/servicio.service';
import { ProductServiceService } from '../data/services/dashboard/productService.service';
import { Status } from '../data/constants/status';
import { switchMap } from 'rxjs';
import { ServicioCRM } from '../data/models/ServicioCRM.model';
import { Service } from '../shared/models/service.model';
import { ServiceUI } from '../shared/models/ui/service-ui.model';
import { State } from '../data/models/status.model';
import { LinkUI } from '../shared/models/ui/link-ui.model';
import { ReportesService } from '../data/services/crm/reportes.service';
import { Reporte } from '../data/models/Reporte.model';
import { query } from '@angular/animations';
@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.page.html',
  styleUrls: ['./voucher.page.scss'],
  standalone: true,
  imports: [
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
    CommonModule,
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
})
export class VoucherPage implements OnInit {
  swiperModules = [IonicSlides];
  upcomingEvents: Event[] = [];
  currentEvents: Event[] = [];
  categories: Category[] = [];


  isloadingVouchers : boolean = false;
  isloadingLinks : boolean = false;
  isloadingServices : boolean = false;


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
      reloadOutline

    });

  }


  private authService = inject(AuthService);
  private listLinks = inject(LinkService);
  private serviceCRM = inject(ServicioService);
  private productService = inject(ProductServiceService);


  states = Status.states;




  ngOnInit(): void {
    this.currentEvents = [...events];
    console.log('current', this.currentEvents);
    this.upcomingEvents = events.sort((a, b) => {
      // Convert id to number for comparison
      const idA = parseInt(a.id, 10);
      const idB = parseInt(b.id, 10);
      return idB - idA; // Descending order
    });
    console.log(this.upcomingEvents);
    this.categories = [...categories];
    console.log(this.categories);


    this.onLoadReportes();
    this.onLoadLinks();
    this.onloadListServices();
  }


  logout() {
    this.authService.logout();
    window.location.reload();

  }




  listServices: Service[] = [];
  listServiceCRM: ServicioCRM[] = [];
  listServicesUi: ServiceUI[] = [];

  links : LinkUI[] = [];

  reportes : Reporte[] = [];

  private reporteService = inject(ReportesService);

  onLoadReportes( ) {
    this.isloadingVouchers = true;
    const client_id = localStorage.getItem('client_id');

    this.reporteService.getByClientId(client_id!).subscribe({
      next: ( resp ) => {
        this.reportes = [];
        this.reportes = [...resp];
        this.isloadingVouchers = false;
      },
      error: ( err ) => {

      },
      complete: ( ) => {

      }
    })
  }



  getNameServiceById( id : number ) {
    return this.listServiceCRM.find( service => service.servicio_id === id)?.servicio || '';
  }


  private linkService = inject(LinkService);



  getStatusVoucherByReport( reporte : Reporte) {

  }

  onLoadLinks( ) {
    this.isloadingLinks = true;
    this.links = [];
    this.linkService.getLinks().subscribe({
      next : ( resp ) => {

        this.links = [];

        this.links = [...resp.map( link => {
          const status = this.states.find( status => status.id === link.status) || {id : 0, title : ''} as State ;
          return {
            ...link,
            status
          }
        })];
        this.isloadingLinks = false;
      },
      error : ( err ) => {

      },
      complete : ( ) => {

      }
    })
  }



  private router = inject(Router);
  navigateToVoucher( reporte : Reporte) {
    this.router.navigateByUrl(`voucher/${reporte.poliza_id}?venta_id=${reporte.venta_id}&beneficiario_id=${reporte.beneficiario_id}`);
  }


  onloadListServices() {

    this.isloadingServices = true;
    this.listServicesUi = [];
    this.serviceCRM
      .getAll()
      .pipe(
        switchMap((resp) => {
          this.listServiceCRM = [];
          this.listServiceCRM = [...resp];
          return this.productService.getServices();
        })
      )
      .subscribe({
        next: (resp) => {
          this.listServices = [];
          this.listServices = [...resp];
          //en base a listservice filtrar por servicio_id, si serviceCRM tiene el elemento
          //filtrado, entonces mostrarlo


          this.listServicesUi = [];
          this.listServicesUi = this.listServices.map((service) => {
            const serviceCRM = this.listServiceCRM.filter(
              (serviceCRM) => serviceCRM.servicio_id === service.servicio_id
            )[0];
            return {
              ...service,
              service: serviceCRM,
              status:
                this.states.find((status) => status.id === service.status) ||
                ({ id: 0, title: '' } as any),
            };
          });


          this.isloadingServices = false
          console.log(this.listServicesUi);
        },
        error: (err) => {},
        complete: () => {},
      });
  }

  openUrl( url : string) {
    window.open(url, '_blank');
  }

  getStatusPoliza(venta: Reporte) {

    if(venta.poliza_st < 3 ) {
      const actualDate = new Date();
      const outDate = new Date(venta.fecha_salida.split('T')[0]);
      const returnDate = new Date(venta.fecha_retorno.split('T')[0]);
      const expireDate = new Date(venta.fecha_caducidad.split('T')[0]);


      if((actualDate > returnDate && venta.multiviaje == 1) || (venta.multiviaje > 1 && actualDate > expireDate)) {
        return "vencida"
      }


      if(actualDate > outDate){
        return "activa";
      }

    }


  switch (venta.poliza_st) {
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

}
