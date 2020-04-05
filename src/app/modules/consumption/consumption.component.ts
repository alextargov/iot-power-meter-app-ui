import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, OnInit } from '@angular/core';

import { TimeFrameService } from '../../shared/services/timeFrame/time-frame.service';
import { ITimeFrame } from '../../shared/services/timeFrame/time-frame.interface';
import { ChartService } from '../../shared/services/chart/chart.service';
import { IConsumption } from '../../shared/interfaces/consumption.interface';
import { TimeFrames } from '../../shared/services/timeFrame/time-frames.enum';

@Component({
    selector: 'app-consumption',
    templateUrl: 'consumption.component.html',
    styleUrls: ['consumption.component.scss'],
})
export class ConsumptionComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() public data: IConsumption[];
    @Input() public timeFrame: ITimeFrame;

    private timeFrameRanges: { [key: string]: ITimeFrame };
    private isZoomed = false;
    private chartIndex = {
        start: 0,
        end: 0
    }

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
        if (change.timeFrame) {
            await this.getTimeFrames();
            console.log(this.timeFrame);
        }

        if (change.data && this._selector) {
            this.chart.clearLabels();
            const label = this.chartService.checkForLabels(this.data)[0];

            if (label) {
                this.chart.addLabel(label.x, label.y, label.text, label.align);
            }

            if (!this.isZoomed && this.timeFrame.frame === TimeFrames.today) {
                this.chart.dataProvider = this.data;
                this.chart.validateData();
            }
        }
    }

    public createChart(data: any): void {
        const config = {
            title: 'Consumption (W)',
            balloonText: 'Watts:'
        }

        const chartConfig = this.chartService.getSerialChartConfig(this.timeFrame, this.timeFrameRanges, data, config)
        this.chart = this.amChartsService.makeChart(this._selector.nativeElement, chartConfig);

        this.chart.addListener('zoomed', this.onZoom.bind(this));
        this.chart.addListener('dataUpdated', this.onDataUpdated.bind(this));
    }

    private async getTimeFrames(): Promise<void> {
        this.timeFrameRanges = await this.timeFrameService.getTimeFrame(this.timeFrame).toPromise();
    }

    private onZoom(event): void {
        this.isZoomed = !(event.startIndex === this.chartIndex.start && event.endIndex === this.chartIndex.end)
    }

    private onDataUpdated(event): void {
        this.chartIndex = {
            start: event.chart.startIndex,
            end: event.chart.endIndex
        }

        this.onZoom(this.chart);
    }
}
