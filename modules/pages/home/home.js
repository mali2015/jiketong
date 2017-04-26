module.exports = {
    url: '/home',
    template: __inline('./home.html'),
    controller: ['$scope', '$getData', '$checkLog', 'datacontext', '$state',
        function($scope, $getData, $checkLog, datacontext, $state) {
            $checkLog(datacontext);
            $scope.datacontext = datacontext;
            $scope.username = localStorage.username;
            $scope.chartSource = '';
            $scope.chartScopes = [{
                name: '全部',
                value: 90
            }, {
                name: '最近30天',
                value: 30
            }, {
                name: '最近7天',
                value: 7
            }];
            $scope.scopeType = 0;

            $getData('plan_report_total', {
                datatype: 'yesterday'
            }).then(function(res) {
                $scope.statistical = res.result;
            });

            $getData('plan_report_detail', {
                delta: $scope.chartScopes[$scope.scopeType].value
            }).then(function(res) {
                $scope.detailinfo = res.list;
            });

            $getData('plan_report_trend', {
                delta: $scope.chartScopes[$scope.scopeType].value
            }).then(function(res) {
                baseoption.xAxis.categories = [];
                baseoption.series[0].data = [];
                baseoption.series[1].data = [];
                for (var i = 0; i < res.list.length; i++) {
                    var item = res.list[i];
                    baseoption.xAxis.categories.push(item.create_time);
                    baseoption.series[0].data.push(item.total_click);
                    baseoption.series[1].data.push(item.total_pv);
                }
                var chart;
                chart = new Highcharts.Chart(baseoption);
            });

            var hideList = false;
            var chartList = false;
            $scope.onShowBtnClick = function(event) {
                hideList = showList($(".hide-list"), $(event.target), hideList);
            }

            $scope.onChartSelectClick = function(event) {
                chartList = showList($(".chart-left-select ul"), $(event.target), chartList);
            }

            $scope.onDetailClick = function(detail) {
                $state.go('board.statement', { id: detail.plan_id });
            }

            $scope.onChangeSource = function(source) {
                $scope.chartSource = source;
                $getData('plan_report_trend', {
                    delta: $scope.chartScopes[$scope.scopeType].value,
                    platform: $scope.chartSource
                }).then(function(res) {
                    baseoption.xAxis.categories = [];
                    baseoption.series[0].data = [];
                    baseoption.series[1].data = [];
                    for (var i = 0; i < res.list.length; i++) {
                        var item = res.list[i];
                        baseoption.xAxis.categories.push(item.create_time);
                        baseoption.series[0].data.push(item.total_click);
                        baseoption.series[1].data.push(item.total_pv);
                    }
                    var chart;
                    chart = new Highcharts.Chart(baseoption);
                });
            }

            $scope.onChangeScope = function(scope) {
                $scope.scopeType = scope;
                $getData('plan_report_trend', {
                    delta: $scope.chartScopes[$scope.scopeType].value,
                    platform: $scope.chartSource
                }).then(function(res) {
                    baseoption.xAxis.categories = [];
                    baseoption.series[0].data = [];
                    baseoption.series[1].data = [];
                    for (var i = 0; i < res.list.length; i++) {
                        var item = res.list[i];
                        baseoption.xAxis.categories.push(item.create_time);
                        baseoption.series[0].data.push(item.total_click);
                        baseoption.series[1].data.push(item.total_pv);
                    }
                    var chart;
                    chart = new Highcharts.Chart(baseoption);
                });
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

            var baseoption = {
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
                    categories: []
                },
                yAxis: {
                    title: {
                        text: false /* 如果左侧有标题则把false换成 引号+内容 例如-'Y轴名称' */
                    },
                    labels: {
                        formatter: function() {
                            return this.value; /*如果左侧Y轴没有内容，则这个function里面为空*/
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
                    data: []
                }, {
                    name: '总曝光',
                    data: []
                }]
            };
        }
    ],
    resolve: {
        datacontext: ['$getData', function($getData) {
            return $getData('plan_list', {});
        }]
    }
};
