import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { IVoltage } from '../../interfaces/voltage.interface';
import { ICurrent } from '../../interfaces/current.interface';
import { IConsumption } from '../../interfaces/consumption.interface';
import { ITimeFrame } from '../../services/timeFrame/time-frame.interface';
import { TimeFrames } from '../../services/timeFrame/time-frames.enum';

import { TimeFrameService } from '../../services/timeFrame/time-frame.service';
import { ChartService } from '../../services/chart/chart.service';

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

    private timeFrameRanges: { [key: string]: ITimeFrame };
    private isZoomed = false;
    private chartIndex = {
        start: 0,
        end: 0
    }

    @ViewChild('chart', { static: false }) public chartElement: ElementRef;

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
        this.chart = this.createChart(this.data, this.config, this.chartElement);
    }

    public async ngOnChanges(change: SimpleChanges): Promise<void> {
        if (change.timeFrame) {
            await this.getTimeFrames();
        }

        if (change.data && this.chartElement && this.chart && this.timeFrame) {
            this.onDataChange(this.data, this.chart);
        }
    }

    public createChart(
        data: IConsumption[] | ICurrent[] | IVoltage [],
        additionalConfig: any,
        chartElement: ElementRef,
    ): AmChart {
        const chartConfig = this.chartService.getSerialChartConfig(this.timeFrame, this.timeFrameRanges, data, additionalConfig)
        const chartInstance = this.amChartsService.makeChart(chartElement.nativeElement, chartConfig);

        chartInstance.addListener('zoomed', this.onZoom.bind(this));
        chartInstance.addListener('dataUpdated', this.onDataUpdated.bind(this));

        return chartInstance;
    }

    private onDataChange(data: IConsumption[] | ICurrent[] | IVoltage [], chart: AmChart): void {
        chart.clearLabels();
        const label = this.chartService.checkForLabels(data)[0];

        if (label) {
            chart.addLabel(label.x, label.y, label.text, label.align);
        }

        if (!this.isZoomed && this.timeFrame.frame === TimeFrames.today) {
            chart.dataProvider = data;
            chart.validateData();
        }
    }

    private async getTimeFrames(): Promise<void> {
        this.timeFrameRanges = await this.timeFrameService.getTimeFrame(this.timeFrame).toPromise();
    }

    private onZoom(event): void {
        this.isZoomed = !(event.startIndex === this.chartIndex.start && event.endIndex === this.chartIndex.end);
    }

    private onDataUpdated(event): void {
        this.chartIndex = {
            start: event.chart.startIndex,
            end: event.chart.endIndex
        }

        this.onZoom(this.chart);
    }
}
