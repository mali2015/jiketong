module.exports = {
    url: '/statement',
    template: __inline('./statement.html'),
    controller: ["$scope", function($scope) {
        var statementList = false;
        var chartList = false;
        $scope.onHeadClick = function(event) {
            statementList = showList($(".statement .hide-list"), $(event.target), statementList);
        }

        $scope.onChartSelectClick = function(event) {
        	chartList = showList($(".chart-left-select ul"), $(event.target), chartList);
        }

        function showList(list, self, state) {
            list.slideToggle();
            if (!state) {
                self.removeClass("down").addClass("up");
                return true;
            } else {
                self.removeClass("up").addClass("down");
                return false;
            }
        }

        var chart;
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
            },
            title: {
                text: false /*text: '这里放标题'*/
            },
            subtitle: {
                text: false /*text: '这里放副标题'*/
            },
            xAxis: {
                categories: ['11.15', '11.16', '11.17', '11.18', '11.19', '11.20', '11.21', '11.22']
            },
            yAxis: {
                title: {
                    text: false /* 如果左侧有标题则把false换成 引号+内容 例如-'Y轴名称' */
                },
                labels: {
                    formatter: function() {
                        return this.value / 50000 + 'K'; /*如果左侧Y轴没有内容，则这个function里面为空*/
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    return this.series.name + ' <b>' +
                        Highcharts.numberFormat(this.y, 0, null, '') + '</b><br/>日期 ' + this.x;
                }
            },
            plotOptions: {
                area: {
                    pointStart: 1940,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 1,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: '总点击',
                data: [5000, 12000, 100000, 253000, 215000, 354000, 600000, 456400]
            }, {
                name: '总曝光',
                data: [15000, 17000, 120000, 553000, 615000, 470000, 800000, 666400]
            }]
        });
    }]
};
