import {Injectable} from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import {SeoModel} from "../models/seo.model";

@Injectable()
export class SeoService {
    constructor(private titleService: Title,
                private metaService: Meta,
                ) {}

    updateSeoInfo(model: SeoModel) {
        this.updateTitle(model.title);
        this.updateMeta("description", model.description);
        this.updateMeta("keywords", model.keywords);
    }

    private updateTitle(title: string) {
        this.titleService.setTitle(title);
    }

    private updateMeta(name: string, content: string) {
        if (content) {
            this.metaService.updateTag({name, content});
        } else {
            this.metaService.updateTag({name, content: ""});
        }

    }

}
