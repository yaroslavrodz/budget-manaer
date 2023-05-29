import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'date'
})
export class AppDatePipe implements PipeTransform {
    constructor(private datePipe: DatePipe) { }

    transform(value: Date | string | number, format?: string, timezone?: string, locale?: string): string | null;
    transform(value: null | undefined, format?: string, timezone?: string, locale?: string): null;
    transform(value: Date | string | number | null | undefined, format?: string, timezone?: string, locale?: string): string | null {
        return this.datePipe.transform(value, format || 'HH:mm, dd/MM/yyyy', timezone, locale);
    }
}
