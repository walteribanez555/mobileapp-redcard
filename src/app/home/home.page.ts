import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
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
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowForwardOutline,
  locateOutline,
  locationOutline,
  notificationsOutline,
  optionsOutline,
  reloadOutline,
} from 'ionicons/icons';
import { Category } from '../interfaces/category.interface';
import { Event } from '../interfaces/event.interface';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { ServicioService } from '../data/services/crm/servicio.service';
import { ProductServiceService } from '../data/services/dashboard/productService.service';
import { Service } from '../shared/models/service.model';
import { ServicioCRM } from '../data/models/ServicioCRM.model';
import { switchMap } from 'rxjs';
import { ServiceUI } from '../shared/models/ui/service-ui.model';
import { Status } from '../data/constants/status';
import { CoverageService } from '../data/services/dashboard/coverage.service';
import { DiscountService } from '../data/services/dashboard/discount.service';
import { Coverage } from '../data/models/Coverage.model';
import { Discount } from '../data/models/Discount.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  swiperModules = [IonicSlides];
  upcomingEvents: Event[] = [];
  currentEvents: Event[] = [];
  categories: Category[] = [];

  constructor() {
    addIcons({
      locateOutline,
      notificationsOutline,
      optionsOutline,
      locationOutline,
      arrowForwardOutline,
      reloadOutline,
    });
  }

  listServices: Service[] = [];
  listServiceCRM: ServicioCRM[] = [];
  listServicesUi: ServiceUI[] = [];
  listCoverages: Coverage[] = [];
  listDiscounts: Discount[] = [];

  states = Status.states;

  private serviceCRM = inject(ServicioService);
  private serviceMKT = inject(ProductServiceService);
  private coverageService = inject(CoverageService);
  private discountService = inject(DiscountService);

  onLoading: boolean = false;

  ngOnInit(): void {
    // this.currentEvents = [...events];
    // console.log('current', this.currentEvents);
    // this.upcomingEvents = events.sort((a, b) => {
    //   // Convert id to number for comparison
    //   const idA = parseInt(a.id, 10);
    //   const idB = parseInt(b.id, 10);
    //   return idB - idA; // Descending order
    // });
    // console.log(this.upcomingEvents);
    // this.categories = [...categories];
    // console.log(this.categories);
    this.onloadListServices();
  }

  onClickFooter() {
    window.open('https://cotizaredcard.online/cotizar', '_blank');
  }

  onloadListServices() {
    this.onLoading = true;

    this.listServicesUi = [];
    this.serviceCRM
      .getAll()
      .pipe(
        switchMap((resp) => {
          this.listServiceCRM = [];
          this.listServiceCRM = [...resp];
          return this.serviceMKT.getServices();
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

          this.onLoading = false;
        },
        error: (err) => {},
        complete: () => {},
      });

    this.coverageService.getCoverages().subscribe((resp) => {
      this.listCoverages= resp;
    });
    this.discountService.getDiscounts().subscribe((resp) => {
      this.listDiscounts = resp;
    });
  }
}
