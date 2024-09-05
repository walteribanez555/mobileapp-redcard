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
import { Discount } from 'src/app/data/models/Discount.model';
import { DiscountService } from 'src/app/data/services/dashboard/discount.service';
import { Event } from 'src/app/interfaces/event.interface';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';


@Component({
  selector: 'app-discount',
  templateUrl: './discount.page.html',
  styleUrls: ['./discount.page.scss'],
  standalone: true,
  imports: [CommonModule,
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
export class DiscountPage implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    this.onloadListServices();

  }

  swiperElement = signal<SwiperContainer | null>(null);
  indexCat: number = 0;

  event!: Event;

  private route = inject(ActivatedRoute);


  files: string[] =[];

  constructor() {
    addIcons({ calendarOutline, locationOutline, heartOutline });
  }

  ngOnInit() {
    console.log();
  }

  getService(id: string) {}

  // listServices: Service[] = [];
  // listServiceCRM: ServicioCRM[] = [];
  // listServicesUi: ServiceUI[] = [];
  listDiscount :Discount[] = [];


  selectedDiscount: Discount | null = null;

  // private serviceCRM = inject(ServicioService);
  // private serviceMKT = inject(ProductServiceService);

  private discountService = inject(DiscountService);

  isloading : boolean = false;


  onloadListServices() {

    this.isloading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.discountService.getDiscount(id!).subscribe(resp => {


      if(resp.length > 0 ) {
        this.selectedDiscount = resp[0];
        this.files = this.selectedDiscount.imagesUrl.split(',');
        this.isloading = false;

      }

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
      this.swiperElement()?.initialize();
    })

    }

    onClickFooter() {

      window.open('https://cotizaredcard.online/cotizar', '_blank');
    }





}
