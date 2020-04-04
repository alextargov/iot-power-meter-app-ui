import * as moment from 'moment';
import { ITimeFrame } from '../timeFrame/time-frame.interface';

export class ChartService {
    public getSerialChartConfig(timeFrame: ITimeFrame, timeFrameRanges: object, data: any[], config: any): object {
        const minimumDate = timeFrame && timeFrameRanges ?
            timeFrameRanges[timeFrame.frame].startDate :
            moment().startOf('day');

        const maximumDate = timeFrame && timeFrameRanges ?
            timeFrameRanges[timeFrame.frame].endDate :
            moment().endOf('day');
        const labels = data && data.length ?
            [] :
            [{
                id: 'noData',
                x: 0,
                y: '50%',
                text: 'The chart contains no data',
                align: 'center',
                alpha: 0.5,
                rotation: 0
            }]
        console.log(labels);

        return {
            type: 'serial',
            theme: 'light',
            marginRight: 80,
            dataProvider: data,
            startDuration: 0,
            valueAxes: [{
                position: 'left',
                title: config.title,
                minimumDate,
                maximumDate,
            }],
            graphs: [{
                id: 'g1',
                fillAlphas: 0.1,
                lineAlpha: 1,
                valueField: 'value',
                balloonText: `<div style=\'margin:5px; font-size:19px;\'>${config.balloonText} <b>[[value]]</b></div>`
            }],
            allLabels: labels,
            chartScrollbar: {
                graph: 'g1',
                scrollbarHeight: 50,
                backgroundAlpha: 0,
                selectedBackgroundAlpha: 0.1,
                selectedBackgroundColor: '#888888',
                graphFillAlpha: 0,
                graphLineAlpha: 0.5,
                selectedGraphFillAlpha: 0,
                selectedGraphLineAlpha: 1,
                // autoGridCount: true,
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
                minPeriod: 'ss',
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
