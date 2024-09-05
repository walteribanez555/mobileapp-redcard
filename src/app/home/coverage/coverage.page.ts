import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit, signal } from '@angular/core';
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
import { Coverage } from 'src/app/data/models/Coverage.model';
import { Discount } from 'src/app/data/models/Discount.model';
import { CoverageService } from 'src/app/data/services/dashboard/coverage.service';
import { DiscountService } from 'src/app/data/services/dashboard/discount.service';
import { Event } from 'src/app/interfaces/event.interface';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';




@Component({
  selector: 'app-coverage',
  templateUrl: './coverage.page.html',
  styleUrls: ['./coverage.page.scss'],
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
    DatePipe,],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoveragePage implements OnInit {

  event!: Event;

  private route = inject(ActivatedRoute);

  swiperElement = signal<SwiperContainer | null>(null);
  indexCat: number = 0;

  constructor() {
    addIcons({ calendarOutline, locationOutline, heartOutline });
  }

  ngOnInit() {
    this.onloadListServices();
  }

  getService(id: string) {}

  // listServices: Service[] = [];
  // listServiceCRM: ServicioCRM[] = [];
  // listServicesUi: ServiceUI[] = [];
  listCoverage :Coverage[] = [];

  files : String[]  = [];


  selectedCoverage: Coverage | null = null;

  // private serviceCRM = inject(ServicioService);
  // private serviceMKT = inject(ProductServiceService);

  private coverageService = inject(CoverageService);


  isloading : boolean = false;


  onloadListServices() {

    this.isloading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.coverageService.getCoverage(id!).subscribe(resp => {
      if(resp.length > 0 ) {
        this.selectedCoverage= resp[0];

        this.files = this.selectedCoverage!.files.split(',');


        const swiperElemConstructor = document.querySelector(
          `#swiper-${this.indexCat}`
        );


        const swiperOptions: SwiperOptions = {
          slidesPerView: 1,
          spaceBetween: 10,
          autoplay : {
            delay : 3000
          }


        };

        Object.assign(swiperElemConstructor!, swiperOptions);

        this.swiperElement.set(swiperElemConstructor as SwiperContainer);
        this.swiperElement()?.initialize()
      }
      this.isloading = false;
    })

    }



    onClickFooter() {

      window.open('https://cotizaredcard.online/cotizar', '_blank');
    }

}
