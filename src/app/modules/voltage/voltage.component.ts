import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, OnInit } from '@angular/core';

import { TimeFrameService } from '../../shared/services/timeFrame/time-frame.service';
import { ITimeFrame } from '../../shared/services/timeFrame/time-frame.interface';
import { ChartService } from '../../shared/services/chart/chart.service';
import { IVoltage } from '../../shared/interfaces/voltage.interface';

@Component({
    selector: 'app-voltage',
    templateUrl: 'voltage.component.html',
    styleUrls: ['voltage.component.scss'],
})
export class VoltageComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() public data: IVoltage[];
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
        if (change.timeFrame) {
            await this.getTimeFrames();
        }

        if (change.data && this._selector) {
            this.createChart(this.data);
        }
    }

    public createChart(data: any): void {
        const config = {
            title: 'Voltage (V)',
            balloonText: 'Voltage:'
        }

        const chartConfig = this.chartService.getSerialChartConfig(this.timeFrame, this.timeFrameRanges, data, config)
        this.chart = this.amChartsService.makeChart(this._selector.nativeElement, chartConfig);
    }

    private async getTimeFrames(): Promise<void> {
        this.timeFrameRanges = await this.timeFrameService.getTimeFrame(this.timeFrame).toPromise();
    }
}
