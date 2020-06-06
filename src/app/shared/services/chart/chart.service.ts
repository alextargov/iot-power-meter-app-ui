import * as moment from 'moment';
import { ITimeFrame } from '../timeFrame/time-frame.interface';
import { TimeFrames } from '../timeFrame/time-frames.enum';

export class ChartService {

    public checkForLabels(data: any[]): any {
        return data && data.length ?
        [] :
        [{
            id: 'noData',
            x: 0,
            y: '50%',
            text: 'The chart contains no data',
            align: 'center',
            alpha: 0.5,
            rotation: 0
        }];
    }

    public getChartPeriods(timeFrame: ITimeFrame, timeFrameRanges?: object): { minPeriod: string, minimumDate: Date, maximumDate: Date} {
        const selectedTimeFrame = timeFrame ? timeFrame.frame : TimeFrames.today;
        const minimumDate = timeFrame && timeFrameRanges ?
            timeFrameRanges[timeFrame.frame].startDate :
            moment().startOf('day');

        const maximumDate = timeFrame && timeFrameRanges ?
            timeFrameRanges[timeFrame.frame].endDate :
            moment().endOf('day');

        let minPeriod: string;

        switch(selectedTimeFrame) {
            case TimeFrames.last30days:
                minPeriod = 'dd';
                break;
            case TimeFrames.last7days:
                minPeriod = 'hh';
                break;
            case TimeFrames.today:
                minPeriod = 'mm';
                break;
            case TimeFrames.custom:
                const different = moment(maximumDate).diff(minimumDate, 'minute');

                if (different >= 60 * 24 * 7) {
                    minPeriod = 'dd';
                } else if (different >= 60 * 24) {
                    minPeriod = 'hh';
                } else {
                    minPeriod = 'ss'
                }
                break;
        }

        return {
            minPeriod,
            minimumDate,
            maximumDate
        }
    }

    public getSerialChartConfig(timeFrame: ITimeFrame, timeFrameRanges: object, data: any[], config: any): object {
        const {
            minimumDate,
            maximumDate,
            minPeriod
        } = this.getChartPeriods(timeFrame, timeFrameRanges);
        const labels = this.checkForLabels(data);

        return {
            type: 'serial',
            theme: 'light',
            dataProvider: data,
            startDuration: 0,
            valueAxes: [{
                position: 'left',
                title: config.title,
                minimumDate,
                maximumDate,
            }],
            showOnInit: false,
            graphs: [{
                id: 'g1',
                lineAlpha: 1,
                valueField: 'value',
                balloonText: `<div style=\'margin:5px; font-size:19px;\'>${config.balloonText} <b>[[value]]</b></div>`
            }],
            allLabels: labels,
            dataDateFormat: 'DD MMM YYYY JJ:NN:SS',
            chartScrollbar: {
                graph: 'g1',
                scrollbarHeight: 50,
                backgroundAlpha: 0,
                selectedBackgroundColor: '#888888',
                graphFillAlpha: 0,
                selectedGraphFillAlpha: 0,
                selectedGraphLineAlpha: 1,
                color: '#AAAAAA',
                offset: 15,
            },
            chartCursor: {
                categoryBalloonDateFormat: 'JJ:NN:SS, DD MMMM',
                cursorPosition: 'mouse',
                bulletsEnabled: true
            },
            categoryField: 'date',
            categoryAxis: {
                minPeriod,
                parseDates: true
            },
            export: {
                enabled: true,
                dateFormat: 'YYYY-MM-DD HH:NN:SS'
            },
            pathToImages: 'assets/amcharts/images/'
        }
    }
}
