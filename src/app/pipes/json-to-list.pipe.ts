import { Pipe, PipeTransform } from "@angular/core";
import {AsbTableColumnModel, ColumnConfigModel} from "../models/table.model";


@Pipe({name: "toList"})
export class ToListPipe<T> implements PipeTransform {
  transform(object: AsbTableColumnModel<T>): {
    key: keyof T; value: ColumnConfigModel<T, keyof T>}[] {
    const keys = Object.keys(object) as (keyof T)[];
    return keys.map(
      s => {
        return {
          key: s,
          value: object[s]
        };
      }
    );
  }
}
