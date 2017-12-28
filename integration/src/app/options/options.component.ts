/**
 * @file Component: Options
 * @author yumao<yuzhang.lille@gmail.com>
 */

import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {BUSY_CONFIG_DEFAULTS, IBusyConfig} from 'ng-busy';
import {TemplateService} from '../service/template.service';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';


@Component({
    moduleId: module.id,
    selector: 'demo-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.css']
})
export class OptionsComponent {
    templateType = 'default';
    templates: any = [
        {val: 'default', show: 'Default'},
        {val: 'custom', show: 'Custom'},
        {val: 'template', show: 'Template'}
    ];
    data: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);

    constructor(private http: HttpClient, private templateService: TemplateService) {
    }

    changeTemplate(tmp: string) {
        this.templateType = tmp;
        this.data.template = this.templateService.getTemplate(this.templateType);
    }

    changeBackdrop(element: HTMLInputElement) {
        this.data.backdrop = element.checked;
    }

    playDemo() {
        const promise = new Promise(resolve => {
            setTimeout(() => {
                resolve();
                console.log('Promise finished!')
            }, 8000);
        });

        const observable1: Observable<number> = Observable.create((observer: Observer<number>) => {
            setTimeout(() => {
                observer.next(1);
                observer.complete();
            }, 1000);
        });

        const observable2: Observable<number> = Observable.create((observer: Observer<number>) => {
            setTimeout(() => {
                observer.next(2);
                observer.complete();
            }, 2000);
        });

        const observable3: Observable<number> = Observable.create((observer: Observer<number>) => {
            setTimeout(() => {
                observer.next(3);
                observer.complete();
            }, 5000);
        });

        const observable4: Observable<number> = Observable.create((observer: Observer<number>) => {
            setTimeout(() => {
                observer.next(4);
                observer.complete();
            }, 4000);
        });

        // this.data.busy = promise;
        const sub = observable1.subscribe((val: number) => {
            console.log(`Observer${val} done!`);
        });
        this.data.busy = sub;
        // this.data.busy = observable2.subscribe((val: number) => {
        //     console.log(`Observer${val} done!`);
        // });
        // this.data.busy = observable3.subscribe((val: number) => {
        //     console.log(`Observer${val} done!`);
        // });
        // this.data.busy = observable4.subscribe((val: number) => {
        //     console.log(`Observer${val} done!`);
        // });
    }
}
