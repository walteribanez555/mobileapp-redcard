import { ServicioCRM } from "src/app/data/models/ServicioCRM.model";
import { State } from "src/app/data/models/status.model";

export interface ServiceUI {
  id? : number;
  service_id? : number;
  service : ServicioCRM,
  description : string;
  destiny : string;
  img_url : string;
  status : State;
}
