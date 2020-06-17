import { Component, Input, ViewChild, AfterViewInit, OnChanges, OnInit, SimpleChanges, NgZone } from '@angular/core';

import { IVoltage } from '../../interfaces/voltage.interface';
import { ICurrent } from '../../interfaces/current.interface';
import { IConsumption } from '../../interfaces/consumption.interface';
import { ITimeFrame } from '../../services/timeFrame/time-frame.interface';
import { TimeFrames } from '../../services/timeFrame/time-frames.enum';

import { TimeFrameService } from '../../services/timeFrame/time-frame.service';
import { ChartService } from '../../services/chart/chart.service';


import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.options.queue = true;
am4core.options.minPolylineStep = 5;
am4core.options.animationsEnabled = false;

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'app-data',
    templateUrl: 'data.component.html',
    styleUrls: ['data.component.scss'],
})
export class DataComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() public data: IVoltage[] | ICurrent[] | IConsumption[];
    @Input() public timeFrame: ITimeFrame;
    @Input() public title: string;
    @Input() public config: any;
    private chart: am4charts.XYChart;

    private timeFrameRanges: { [key: string]: ITimeFrame };

    @ViewChild('chart', { static: false }) public chartElement: HTMLElement;

    constructor(
        private readonly timeFrameService: TimeFrameService,
        private readonly zone: NgZone,
    ) {}

    public async ngOnInit(): Promise<void> {
        if (this.timeFrame) {
            await this.getTimeFrames();
        }
    }

    public ngAfterViewInit(): void {
        this.zone.runOutsideAngular(() => {
            const chart = am4core.create(this.title, am4charts.XYChart);

            chart.data = this.data;

            const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            dateAxis.groupData = true;
            dateAxis.groupCount = 200;

            dateAxis.minZoomCount = 5;

            const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.minWidth = 35;

            const series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = 'date';
            series.dataFields.valueY = 'value';
            series.minBulletDistance = 20;

            series.tooltipText = '{valueY.value}';
            chart.cursor = new am4charts.XYCursor();

            const scrollbarX = new am4charts.XYChartScrollbar();
            scrollbarX.series.push(series);
            chart.scrollbarX = scrollbarX;
            this.chart = chart;
        });
    }

    public async ngOnChanges(change: SimpleChanges): Promise<void> {
        if (change.timeFrame) {
            await this.getTimeFrames();

            // this.chart.categoryAxis.minPeriod = this.chartService.getChartPeriods(this.timeFrame, this.timeFrameRanges).minPeriod;
            // console.log(this.chart.categoryAxis.minPeriod);
        }

        if (change.data && this.chart && this.timeFrame) {
            this.onDataChange(this.data, this.chart);
        }
    }

    private onDataChange(data: IConsumption[] | ICurrent[] | IVoltage [], chart: am4charts.XYChart): void {
        if (this.timeFrame.frame === TimeFrames.today) {
            chart.addData(data, 0);
        }
    }

    private async getTimeFrames(): Promise<void> {
        this.timeFrameRanges = await this.timeFrameService.getTimeFrame(this.timeFrame).toPromise();
    }
}
