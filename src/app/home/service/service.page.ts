import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonRow,
  IonCol,
  IonIcon,
  IonCard,
  IonListHeader,
  IonList,
  IonAvatar,
  IonText,
  IonFooter,
  IonButton,
  IonFabButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline, heartOutline, locationOutline } from 'ionicons/icons';
import { switchMap } from 'rxjs';
import { Status } from 'src/app/data/constants/status';
import { events } from 'src/app/data/events';
import { ServicioCRM } from 'src/app/data/models/ServicioCRM.model';
import { ServicioService } from 'src/app/data/services/crm/servicio.service';
import { ProductServiceService } from 'src/app/data/services/dashboard/productService.service';
import { Event } from 'src/app/interfaces/event.interface';
import { Service } from 'src/app/shared/models/service.model';
import { ServiceUI } from 'src/app/shared/models/ui/service-ui.model';

@Component({
  selector: 'app-event',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonFabButton,
    IonButton,
    IonFooter,
    IonText,
    IonAvatar,
    IonList,
    IonListHeader,
    IonCard,
    IonIcon,
    IonCol,
    IonRow,
    IonLabel,
    IonItem,
    IonBackButton,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonContent,
    DatePipe,
  ],
})
export class ServicePage implements OnInit {
  event!: Event;

  private route = inject(ActivatedRoute);

  constructor() {
    addIcons({ calendarOutline, locationOutline, heartOutline });
  }

  ngOnInit() {
    this.onloadListServices();
  }

  getService(id: string) {}

  listServices: Service[] = [];
  listServiceCRM: ServicioCRM[] = [];
  listServicesUi: ServiceUI[] = [];

  states = Status.states;

  selectedService: ServiceUI | null = null;

  private serviceCRM = inject(ServicioService);
  private serviceMKT = inject(ProductServiceService);

  isloading : boolean = false;


  onloadListServices() {
    this.isloading = true;
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

          const id = this.route.snapshot.paramMap.get('id');

          this.selectedService = this.listServicesUi.filter(
            (service) => service.service_id === Number(id)
          )[0];


          this.isloading = false;
        },
        error: (err) => {},
        complete: () => {},
      });
  }


  onClickFooter() {

    window.open('https://cotizaredcard.online/cotizar', '_blank');
  }
}
