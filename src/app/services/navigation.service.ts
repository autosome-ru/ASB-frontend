import {Injectable} from "@angular/core";
import {AsbAppNavigationModel} from "../models/navigation.model";

@Injectable()
export class AsbAppNavigationService {

    public navigationLinks: AsbAppNavigationModel = [
        {
            caption: "Home", children: [
                {url: "/", caption: "", icon: "history"},
            ]
        },

        ]
}
