import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as moment from 'moment';
import { ICurrent } from '../../shared/interfaces/current.interface';

@Component({
    selector: 'app-current',
    templateUrl: 'current.component.html',
    styleUrls: ['current.component.scss'],
})
export class CurrentComponent implements AfterViewInit {
    @Input() public data: ICurrent[];

    @ViewChild('chart', { static: false }) public _selector: ElementRef;

    public chart: AmChart;

    constructor(private readonly amChartsService: AmChartsService) {}

    public ngAfterViewInit(): void {
        this.createChart(this.data);
    }

    public createChart(data: any): void {
        const chartConfig = this.getChartConfig(data);

        this.chart = this.amChartsService.makeChart(this._selector.nativeElement, chartConfig);
    }

    public getChartConfig(data: ICurrent[]): any {
        return {
            type: 'xy',
            theme: 'light',
            dataDateFormat: 'YYYY-MM-DD',
            startDuration: 0,
            export: {
                enabled: true
            },
            chartScrollbar: {
                offset: 15,
                scrollbarHeight: 5,
            },
            chartCursor:{
               pan:true,
               cursorAlpha:0,
               valueLineAlpha:0
            },
            graphs: [{
                bullet: 'diamond',
                lineAlpha: 1,
                lineColor: '#b0de09',
                xField: 'date',
                yField: 'value'
            }],
            valueAxes: [{
                id: 'ValueAxis-1',
                axisAlpha: 0
            }, {
                id: 'ValueAxis-2',
                axisAlpha: 0,
                position: 'bottom',
                type: 'date',
                minimumDate: moment.utc().startOf('day'),
                maximumDate: moment.utc().endOf('day')
            }],
            dataProvider: data,
            pathToImages: 'assets/amcharts/images/'
        };
    }
}
