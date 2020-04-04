import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, OnInit } from '@angular/core';
import * as moment from 'moment';

import { ICurrent } from '../../shared/interfaces/current.interface';
import { TimeFrameService } from '../../shared/services/timeFrame/time-frame.service';
import { ITimeFrame } from '../../shared/services/timeFrame/time-frame.interface';
import { ChartService } from '../../shared/services/chart/chart.service';

@Component({
    selector: 'app-current',
    templateUrl: 'current.component.html',
    styleUrls: ['current.component.scss'],
})
export class CurrentComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() public data: ICurrent[];
    @Input() public timeFrame: any;

    private timeFrameRanges: { [key: string]: ITimeFrame };

    @ViewChild('chart', { static: false }) public _selector: ElementRef;

    public chart: AmChart;

    constructor(
        private readonly amChartsService: AmChartsService,
        private readonly timeFrameService: TimeFrameService,
        private readonly chartService: ChartService
    ) {}

    public async ngOnInit(): Promise<void> {
        if (this.timeFrame) {
            await this.getTimeFrames();
        }
    }

    public ngAfterViewInit(): void {
        this.createChart(this.data);
    }

    public async ngOnChanges(change): Promise<void> {
        // const startDateChange = get(change, ['timeFrame', 'currentValue', 'startDate']);
        // const endDateChange = get(change, ['timeFrame', 'currentValue', 'endDate']);
        // const isCustomDate = get(change, ['timeFrame', 'currentValue', 'frame']) === TimeFrames.custom;

        // if (isCustomDate && startDateChange && endDateChange) {
        //     this.timeFrameRanges = {
        //         ...this.timeFrameRanges,
        //         [TimeFrames.custom]: {
        //             frame: TimeFrames.custom,
        //             startDate: startDateChange,
        //             endDate: endDateChange
        //         }
        //     }
        // }
        if (change.timeFrame) {
            await this.getTimeFrames();
        }

        if (change.data && this._selector) {
            this.createChart(this.data);
        }
    }

    public createChart(data: any): void {
        const config = {
            title: 'Current (A)',
            balloonText: 'Current:'
        }

        const chartConfig = this.chartService.getSerialChartConfig(this.timeFrame, this.timeFrameRanges, data, config)
        this.chart = this.amChartsService.makeChart(this._selector.nativeElement, chartConfig);
    }

    public getChartConfig(data: ICurrent[]): any {
        const minimumDate = this.timeFrame && this.timeFrameRanges ?
            this.timeFrameRanges[this.timeFrame.frame].startDate :
            moment().startOf('day');

        const maximumDate = this.timeFrame && this.timeFrameRanges ?
            this.timeFrameRanges[this.timeFrame.frame].endDate :
            moment().endOf('day');

        return {
            type: 'xy',
            theme: 'light',
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
            valueAxes: [

                {
                    id: 'ValueAxis-2',
                    axisAlpha: 1,
                    position: 'bottom',
                    type: 'date',
                    minimumDate,
                    maximumDate,
                    duration: 'hh',
                    minPeriod: 'mm'
                }
            ],
            dataProvider: data,
            pathToImages: 'assets/amcharts/images/'
        };
    }

    private async getTimeFrames(): Promise<void> {
        this.timeFrameRanges = await this.timeFrameService.getTimeFrame(this.timeFrame).toPromise();
    }
}
