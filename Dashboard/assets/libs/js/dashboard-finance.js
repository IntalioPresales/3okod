var Period = 20000;//in milliseconds - 20 second

var AUCTION_SpendingValueRatePerPeriod = getRandomInt(0, 10) / 100// 0.2;
var FRP_SpendingValueRatePerPeriod = getRandomInt(0, 5) / 100//0.08;
var RFI_SpendingValueRatePerPeriod = getRandomInt(1, 8) / 100//0.05;
var RFQ_SpendingValueRatePerPeriod = getRandomInt(0, 5) / 100//0.1;

var AUCTION_Target = 50000;
var FRP_Target = 25000;
var RFI_Target = 20;
var RFQ_Target = 9000;

function getRandomInt(min, max) {
    var value = Number(Math.floor(Math.random().toFixed(2) * (max - min + 1)) + min).toFixed(2);
    return Math.floor(value);
}

function getLastVisit() {
    var lastVisit = localStorage.LastVisit;

    var newLastVisit = new Date().getTime();

    if (!lastVisit) {
        localStorage.setItem("LastVisit", newLastVisit);
        return newLastVisit;
    }

    return lastVisit;
}

function shouldUpdateValues() {
    var nowTime = new Date().getTime();
    if (nowTime - getLastVisit() >= Period) {
        return true;
    }
    return false;
}

function getTenderCategoriesValues() {
    var objToReturn = {
        Auction: {
            Value: getAuctionValue(),
            Percentage: (AUCTION_SpendingValueRatePerPeriod * 100).toFixed(0),
        },
        FRP: {
            Value: getFRPValue(),
            Percentage: (FRP_SpendingValueRatePerPeriod * 100).toFixed(0)
        },
        RFI: {
            Value: getRFIValue(),
            Percentage: (RFI_SpendingValueRatePerPeriod * 100).toFixed(0)
        },
        RFQ: {
            Value: getRFQValue(),
            Percentage: (RFQ_SpendingValueRatePerPeriod * 100).toFixed(0)
        }
    };
    return objToReturn;
}

//values of Tender categories
function getAuctionValue() {
    if (!localStorage.AuctionValue) {
        localStorage.setItem("AuctionValue", 1250)
        return 1250;
    }
    if (shouldUpdateValues()) {
        var newValue = parseInt(localStorage.AuctionValue) + (parseInt(localStorage.AuctionValue) * AUCTION_SpendingValueRatePerPeriod);
        newValue = newValue.toFixed(2);
        localStorage.setItem("AuctionValue", newValue);
        return newValue;
    }
    return parseInt(localStorage.AuctionValue).toFixed(2);
}

function getFRPValue() {
    if (!localStorage.FRPValue) {
        localStorage.setItem("FRPValue", 1480)
        return 1480;
    }
    if (shouldUpdateValues()) {
        var newValue = parseInt(localStorage.FRPValue) + (parseInt(localStorage.FRPValue) * FRP_SpendingValueRatePerPeriod);
        newValue = newValue.toFixed(2);
        localStorage.setItem("FRPValue", newValue)
        return newValue;
    }
    return parseInt(localStorage.FRPValue).toFixed(2);
}

function getRFIValue() {
    if (!localStorage.RFIValue) {
        localStorage.setItem("RFIValue", 20)
        return 20;
    }
    if (shouldUpdateValues()) {
        var newValue = parseInt(localStorage.RFIValue) + (parseInt(localStorage.RFIValue) * RFI_SpendingValueRatePerPeriod);
        //newValue = newValue.toFixed(2);
        localStorage.setItem("RFIValue", Math.ceil(newValue))
        return Math.ceil(newValue);
    }
    return Math.ceil(parseInt(localStorage.RFIValue));
}

function getRFQValue() {
    if (!localStorage.RFQValue) {
        localStorage.setItem("RFQValue", 1600)
        return 1600;
    }
    if (shouldUpdateValues()) {
        var newValue = parseInt(localStorage.RFQValue) + (parseInt(localStorage.RFQValue) * RFQ_SpendingValueRatePerPeriod);
        newValue = newValue.toFixed(2);
        localStorage.setItem("RFQValue", newValue)
        return newValue;
    }
    return parseInt(localStorage.RFQValue).toFixed(2);
}
//end values of Tender categories

function tenderCategoryOnClick(category) {
    if (category == 'rfi')
        return;

    var arrayFRPTargets = [FRP_Target, FRP_Target + (FRP_Target * 0.1), FRP_Target + (FRP_Target * 0.3), FRP_Target - (FRP_Target * 0.2)];
    var arrayAuctionTargets = [AUCTION_Target, AUCTION_Target + (AUCTION_Target * 0.2), AUCTION_Target + (AUCTION_Target * 0.1), AUCTION_Target - (AUCTION_Target * 0.2)];
    var arrayRFITargets = [RFI_Target, RFI_Target + (RFI_Target * 0.1), RFI_Target + (RFI_Target * 0.1), RFI_Target - (RFI_Target * 0.15)];
    var arrayRFQTargets = [RFQ_Target, RFQ_Target + (RFQ_Target * 0.05), RFQ_Target + (RFQ_Target * 0.15), RFQ_Target - (RFQ_Target * 0.1)];

    var arrayRFPAchieved = [FRP_Target - 1000, FRP_Target + 500, FRP_Target - 1000, FRP_Target * 0.5];
    var arrayAuctionAchieved = [AUCTION_Target - 1000, AUCTION_Target + 500, AUCTION_Target - 1200, AUCTION_Target * 0.3];
    var arrayRFIAchieved = [RFI_Target - 1000, RFI_Target + 500, RFI_Target - 1200, RFI_Target * 0.4];
    var arrayRFQAchieved = [RFQ_Target - 1000, RFQ_Target + 500, RFQ_Target - 1200, RFQ_Target * 0.25];

    var arrayRFPAchievedDicscount = [];
    var arrayAuctionAchievedDicscount = [];
    var arrayRFIAchievedDicscount = [];
    var arrayRFQAchievedDicscount = [];

    for (var i = 0; i < arrayRFPAchieved.length; i++) {
        arrayRFPAchievedDicscount.push(arrayRFPAchieved[i] - (arrayRFPAchieved[i] * 0.1));
    }

    for (var i = 0; i < arrayAuctionAchieved.length; i++) {
        arrayAuctionAchievedDicscount.push(arrayAuctionAchieved[i] - (arrayAuctionAchieved[i] * 0.1));
    }

    for (var i = 0; i < arrayRFIAchieved.length; i++) {
        arrayRFIAchievedDicscount.push(arrayRFIAchieved[i] - (arrayRFIAchieved[i] * 0.1));
    }

    for (var i = 0; i < arrayRFQAchieved.length; i++) {
        arrayRFQAchievedDicscount.push(arrayRFQAchieved[i] - (arrayRFQAchieved[i] * 0.1));
    }

    $('#tendersTurnover').fadeOut(300, function () {
        switch (category) {
            case 'rfp':
                $('#tenderTurnoverTitle').text("مناقصات");
                initTenderTurnover(arrayFRPTargets, arrayRFPAchieved, arrayRFPAchievedDicscount);
                break;
            case 'auction':
                $('#tenderTurnoverTitle').text("مزايدات");
                initTenderTurnover(arrayAuctionTargets, arrayAuctionAchieved, arrayAuctionAchievedDicscount);
                break;
            //case 'rfi':
            //    $('#tenderTurnoverTitle').text("RFI");
            //    initTenderTurnover(arrayRFITargets, arrayRFIAchieved, arrayRFIAchievedDicscount,true);
            //    break;
            case 'rfq':
                $('#tenderTurnoverTitle').text("عروض اسعار");
                initTenderTurnover(arrayRFQTargets, arrayRFQAchieved, arrayRFQAchievedDicscount);
                break;
        }
    })

}

function initTenderTurnover(arrayTarget, arrayAchived, arrayAchievedDiscount, isOnlyNumbers) {
    $('#tendersTurnover').fadeIn(300, function () { });

    setTimeout(function () {
        new Chartist.Bar('.ct-chart-inventory', {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            series: [
                arrayTarget,
                arrayAchived,
                arrayAchievedDiscount
            ]
        }, {
            stackBars: false,
            axisY: {
                offset: 70,
                position: "right",
                labelInterpolationFnc: function (value) {
                    if (!isOnlyNumbers) {
                        if (value > 1000000) {
                            return 'د.أ' + (value / 1000000) + 'M';
                        }
                        else if (value > 1000) {
                            return 'د.أ' + (value / 1000) + 'k';
                        }
                        return 'د.أ' + value;
                    }
                    return value;
                }
            },
        }).on('draw', function (data) {
            if (data.type === 'bar') {
                data.element.attr({
                    style: 'stroke-width: 30px',
                });
            }
        });
    }, 50);
}

function assignOnClickDataTable(id) {
    var tableSuppliers = $('#' + id).DataTable({
        "order": [],
        paging: true,
        pageLength: 5,
        "oLanguage": {
            "sSearch": "بحث: ",
            "oPaginate": {
                "sFirst": "الاول",
                "sLast": "الاخير",
                "sNext": "التالي",
                "sPrevious": "السابق"
            },
            "sInfo": "اظهار _START_ الى _END_ من _TOTAL_",
        },
        language: {
            info: "اظهار _START_ الى _END_ من _TOTAL_ المجموع",
        }
    });

    //var tableBlackList = $('#blackList').DataTable({
    //    paging: true,
    //    pageLength: 5
    //});
    $('#' + id + ' tbody').on('click', 'tr', function () {
        //$(this).find(".applied").text();
        var totalApplied = parseInt($(this).find(".applied").text());

        $('#txtTenderByUser').text("مناقصات " + $(this).find(".userName").text());

        if ($(this).hasClass('selected')) {
            //    $(this).removeClass('selected');
        }
        else {
            tableSuppliers.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            $('#userDetailsRow').fadeOut(300, function () {
                $('#tenderByCategory').empty();
                $('#userDetailsRow').fadeIn(300);

                setTimeout(function () {
                    var arrayRFI = [totalApplied - 1 > 0 ? totalApplied - 1 : 0, totalApplied - 4 > 0 ? totalApplied - 4 : 0, totalApplied - 2 > 0 ? totalApplied - 2 : 0, totalApplied - 3 > 0 ? totalApplied - 3 : 0];
                    var arrayRFP = [totalApplied - 2 > 0 ? totalApplied - 2 : 0, totalApplied - 4 > 0 ? totalApplied - 4 : 0, totalApplied - 3 > 0 ? totalApplied - 3 : 0, totalApplied - 6 > 0 ? totalApplied - 6 : 0];
                    var arrayAuction = [totalApplied - 3 > 0 ? totalApplied - 3 : 0, totalApplied - 2 > 0 ? totalApplied - 2 : 0, totalApplied - 1 > 0 ? totalApplied - 1 : 0, totalApplied - 6 > 0 ? totalApplied - 6 : 0];
                    var arrayRFQ = [totalApplied - 3 > 0 ? totalApplied - 3 : 0, totalApplied - 5 > 0 ? totalApplied - 5 : 0, totalApplied - 1 > 0 ? totalApplied - 1 : 0, totalApplied - 7 > 0 ? totalApplied - 7 : 0];

                    //Morris.Area({
                    //    element: 'tenderByCategory',
                    //    behaveLikeLine: true,
                    //    data: [
                    //        { x: '2018 Q1', RFI: totalApplied - 1 > 0 ? totalApplied - 1 : 0, RFP: totalApplied - 2 > 0 ? totalApplied - 2 : 0, Auction: totalApplied - 3 > 0 ? totalApplied - 3 : 0, RFQ: totalApplied - 3 > 0 ? totalApplied - 3 : 0 },
                    //        { x: '2018 Q2', RFI: totalApplied - 4 > 0 ? totalApplied - 4 : 0, RFP: totalApplied - 4 > 0 ? totalApplied - 4 : 0, Auction: totalApplied - 2 > 0 ? totalApplied - 2 : 0, RFQ: totalApplied - 5 > 0 ? totalApplied - 5 : 0 },
                    //        { x: '2018 Q3', RFI: totalApplied - 2 > 0 ? totalApplied - 2 : 0, RFP: totalApplied - 3 > 0 ? totalApplied - 3 : 0, Auction: totalApplied - 1 > 0 ? totalApplied - 1 : 0, RFQ: totalApplied - 1 > 0 ? totalApplied - 1 : 0 },
                    //        { x: '2018 Q4', RFI: totalApplied - 3 > 0 ? totalApplied - 3 : 0, RFP: totalApplied - 6 > 0 ? totalApplied - 6 : 0, Auction: totalApplied - 6 > 0 ? totalApplied - 6 : 0, RFQ: totalApplied - 7 > 0 ? totalApplied - 7 : 0 },
                    //    ],
                    //    xkey: 'x',
                    //    ykeys: ['RFI', 'RFP', 'Auction', 'RFQ'],
                    //    labels: ['RFI', 'RFP', 'Auction', 'RFQ'],
                    //    lineColors: ["#832538", "#D4AF37", "#8c7950", "#FFE37F"],
                    //    xLabelAngle: 90,
                    //    //preUnits: ["$"]
                    //});
                    var ctx = document.getElementById('tenderByCategory').getContext('2d');
                    var myChart = new Chart(ctx, {
                        type: 'line',

                        data: {
                            labels: ['2018 Q1', '2018 Q2', '2018 Q3', '2018 Q4'].reverse(),
                            datasets: [{
                                label: 'طلب للحصول على معلومات',
                                data: arrayRFI,
                                backgroundColor: "rgb(0, 157, 230,0.7)",
                                borderColor: "rgba(0,0,0,0.7)",
                                borderWidth: 2

                            }, {
                                label: 'مناقصات',
                                data: arrayRFP,
                                backgroundColor: "rgb(38, 135, 155,0.5)",
                                borderColor: "rgba(0,0,0,0.7)",
                                borderWidth: 2
                            }, {
                                label: 'مزايدات',
                                data: arrayAuction,
                                backgroundColor: "rgb(14, 183, 149,0.5)",
                                borderColor: "rgba(0,0,0,0.7)",
                                borderWidth: 2
                            }, {
                                label: 'عروض أسعار',
                                data: arrayRFQ,
                                backgroundColor: "rgb(11, 95, 133,0.5)",
                                borderColor: "rgba(0,0,0,0.7)",
                                borderWidth: 2
                            }]
                        },
                        options: {

                            legend: {
                                display: true,
                                position: 'bottom',

                                labels: {
                                    fontColor: '#71748d',
                                    fontFamily: 'Droid Arabic Kufi',
                                    fontSize: 14,
                                }
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        // Include a dollar sign in the ticks
                                        callback: function (value, index, values) {
                                            return value;
                                        }
                                    }
                                }]
                            },


                            scales: {
                                xAxes: [{
                                    position: 'right',
                                    ticks: {
                                        fontSize: 14,
                                        fontFamily: 'Droid Arabic Kufi',
                                        fontColor: '#71748d',
                                    }
                                }],
                                yAxes: [{
                                    position: 'right',
                                    ticks: {
                                        fontSize: 14,
                                        fontFamily: 'Droid Arabic Kufi',
                                        fontColor: '#71748d',
                                    }
                                }]
                            }

                        }
                    });


                }, 1);

            });
            $("#morris_gross").empty();
            var budget = getRandomInt(5, 100);
            Morris.Donut({
                element: 'morris_gross',

                data: [
                    { value: budget, label: 'الميزانية' },
                    { value: 100 - budget, label: 'الميزانية' }
                ],

                labelColor: '#0eb795',

                colors: [
                    '#36a5a9',
                    '#1babf2'
                ],

                formatter: function (x) { return x + "%" },
                resize: true

            });
            $('#morris_profit').empty();

            var profit = getRandomInt(10, 100);
            Morris.Donut({
                element: 'morris_profit',

                data: [
                    { value: profit, label: 'الربح' },
                    { value: 100 - profit, label: 'الربح' }
                ],

                labelColor: '#0eb795',

                colors: [
                    '#36a5a9',
                    '#1babf2'
                ],

                formatter: function (x) { return x + "%" },
                resize: true

            });
        }
    });
}

$(document).ready(function () {
    //$('#suppliersGrid').DataTable({
    //    paging: true,
    //});
    $('#userDetailsRow').fadeOut(300);


    assignOnClickDataTable("suppliersGrid");
    assignOnClickDataTable("blackListGrid");

    var tenderCategoriesValues = getTenderCategoriesValues();

    $('#RFP_Spending').text(tenderCategoriesValues.FRP.Value + "د.أ");
    $('#Auction_Spending').text(tenderCategoriesValues.Auction.Value + "د.أ");
    $('#RFI_Spending').text(tenderCategoriesValues.RFI.Value + " طلب");
    $('#RFQ_Spending').text(tenderCategoriesValues.RFQ.Value + "د.أ");

    if (shouldUpdateValues()) {
        $('#rfpSpendingPercentage').text(tenderCategoriesValues.FRP.Percentage + "%");
        $('#auctionSpendingPercentage').text(tenderCategoriesValues.Auction.Percentage + "%");
        $('#rfiSpendingPercentage').text(tenderCategoriesValues.RFI.Percentage + "%");
        $('#rfqSpendingPercentage').text(tenderCategoriesValues.RFQ.Percentage + "%");
    }
    else {
        $('#rfpSpendingPercentage').parent().remove();
        $('#auctionSpendingPercentage').parent().remove();
        $('#rfiSpendingPercentage').parent().remove();
        $('#rfqSpendingPercentage').parent().remove();

        //$('#rfpSpendingPercentage').text("0%");
        //$('#auctionSpendingPercentage').text("0%");
        //$('#rfiSpendingPercentage').text("0%");
        //$('#rfqSpendingPercentage').text("0%");
    }

    // ============================================================== 
    // Chart Balance Bar
    // ============================================================== 
    var ctx = document.getElementById("chartjs_balance_bar").getContext('2d');
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                //{
                //    label: 'RFI',
                //    data: [50, 120, 130, 30, 40, 110, 163, 150, 60, 80, 250, getDecemberRFI()],
                //    backgroundColor: "rgb(131,37,56)",
                //    borderColor: "rgba(0,0,0)",
                //    borderWidth: 0.5
                //},
                {
                    label: 'مناقصات',
                    data: [25, 100, 90, 120, 20, 35, 25, 30, 55, 75, 160, getDecemberRFP()],
                    backgroundColor: "#46e1c3",
                    borderColor: "#46e1c3",
                    borderWidth: 0.5

                }, {
                    label: 'مزايدات',
                    data: [150, 350, 500, 400, 506, 650, 480, 360, 600, 400, 150, getDecemberAuction()],
                    backgroundColor: "#1babf2",
                    borderColor: "#1babf2",
                    borderWidth: 0.5
                },
                {
                    label: 'عروض أسعار',
                    data: [15, 50, 250, 350, 140, 60, 250, 300, 348, 241, 190, getDecemberRFQ()],
                    backgroundColor: "#26879b",
                    borderColor: "#26879b",
                    borderWidth: 0.5
                }]
        },
        options: {
            legend: {
                display: true,

                position: 'bottom',

                labels: {
                    fontColor: '#71748d',
                    fontFamily: 'Droid Arabic Kufi',
                    fontSize: 14,
                }
            },

            scales: {
                xAxes: [{
                    position: 'right',
                    ticks: {
                        fontSize: 14,
                        fontFamily: 'Droid Arabic Kufi',
                        fontColor: '#71748d',
                    }
                }],
                yAxes: [{
                    position: 'right',
                    ticks: {
                        fontSize: 14,
                        fontFamily: 'Droid Arabic Kufi',
                        fontColor: '#71748d',
                    }
                }]
            }
        }
    });

    // ============================================================== 
    // Accounts Payable Age
    // ============================================================== 


    var ctx = document.getElementById("suppliersChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["طلب للحصول على معلومات", "مناقصات", "مزايدات", "عروض أسعار"],
            datasets: [{
                backgroundColor: [
                    "#0eb795",
                    "#26879b ",
                    "#36a5a9",
                    "#46e1c3"
                ],
                data: [getRFISuppliersNumber(), getRFPSuppliersNumber(), getAuctionSuppliers(), getRFQSuppliers()]
            }]
        },
        options: {
            legend: {

                display: true,
                position: 'bottom',

                labels: {
                    fontColor: '#71748d',
                    fontFamily: 'Droid Arabic Kufi',
                    fontSize: 14,
                }
            },
        }
    });
    var totalSuppliers = getRFISuppliersNumber() + getRFPSuppliersNumber() + getAuctionSuppliers() + getRFQSuppliers();
    $('#totalSuppliers').text(totalSuppliers);
    $('#totalFRPDownloads').text(totalSuppliers * 3);

    $('#totalBlackListSuppliers').text(Math.floor(totalSuppliers / 4));
    var decemberTenders = getDecemberRFI() + getDecemberRFP() + getDecemberAuction() + getDecemberRFQ();

    $('#totalAwardedTenders').text(Math.floor(decemberTenders / 5));
    //var chart = c3.generate({
    //    bindto: "#suppliersChart",
    //    color: { pattern: ["#832538", "#D4AF37", "#8c7950", "#A0522D"] },
    //    data: {
    //        // iris data from R
    //        columns: [
    //            ['RFI', getRFISuppliersNumber()],
    //            ['RFP', getRFPSuppliersNumber()],
    //            ['Auction', getAuctionSuppliers()],
    //            ['RFQ', getRFQSuppliers()],
    //        ],
    //        type: 'pie',

    //    },
    //    pie: {
    //        label: {
    //            format: function (value, ratio, id) {
    //                return value;
    //            }
    //        }
    //    },
    //    tooltip: {
    //        format: {
    //            title: function (d) { return 'Data ' + d; },
    //            value: function (value, ratio, id) {
    //                var format = id === 'data1' ? d3.format(',') : d3.format('$');
    //                return format(value);
    //            }
    //            //            value: d3.format(',') // apply this format to both y and y2
    //        }
    //    }
    //});
    //setTimeout(function () {
    //    chart.load({

    //    });
    //}, 1500);
    //setTimeout(function () {
    //    chart.unload({
    //        ids: 'data1'
    //    });
    //    chart.unload({
    //        ids: 'data2'
    //    });
    //},
    //2500
    //);

    var arrayYears = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];
    var minimumPerYear = 500000;
    var maxPerYear = 2000000;

    new Chartist.Line('.ct-chart-line-invoice', {
        labels: arrayYears,
        series: [
            [2500000, 2365420, 1952102, 1705576, 1958566, 1516008, 1922700, 2210063, 2378772],
            [1376790, 1506790, 1806790, 1986790, 1506790, 1206790, 1606790, 1306790, 1406790],
            [618995, 548995, 478995, 268995, 308995, 155479, 225479, 295479, 375479],
            //[833698, 1578320, 1534053, 1434958, 1874859, 1856063, 1878355, 681718, 1067503],
        ]
    }, {
        low: 0,
        showArea: true,
        showPoint: false,
        fullWidth: true,
        chartPadding: {
            right: 10
        },
        axisY: {
            offset: 70,
            position: 'End',
            labelInterpolationFnc: function (value) {
                if (value >= 1000000) {
                    return 'د.أ' + (value / 1000000) + 'M';
                }
                else if (value >= 1000) {
                    return 'د.أ' + (value / 1000) + 'k';
                }
                return 'د.أ' + value;
            },
            labelOffset: { x: 0 }
        },
    });

    new Chartist.Line('.ct-chart-line-awarded-contracts', {
        labels: arrayYears,
        series: [
            [2250, 3337, 4546, 7565, 8445, 6511, 4196, 8496, 9522],
            [10733, 18329, 16940, 10312, 11078, 10968, 12799, 13907, 13401],
            [1137, 2209, 2904, 1657, 1281, 754, 1969, 11260, 1964],
            [9657, 10974, 10155, 10029, 11146, 7644, 7421, 5703, 5164],
        ]
    }, {
        fullWidth: true,
        chartPadding: {
            right: 40
        },
        axisY: {
            position: 'right',
            //labelInterpolationFnc: function (value) {
            //    //if (value >= 1000000) {
            //    //    return '$' + (value / 1000000) + 'M';
            //    //}
            //    //else if (value >= 1000) {
            //    //    return '$' + (value / 1000) + 'k';
            //    //}
            //    //return '$' + value;
            //    return value;
            //}
        },
    });

    var nowTime = new Date().getTime();
    var lastVisit = localStorage.LastVisit;
    if (nowTime - lastVisit >= Period) {
        localStorage.setItem("LastVisit", nowTime);
    }
});

function getDecemberRFI() {
    if (!localStorage.getItem("DecemberRFI")) {
        localStorage.setItem("DecemberRFI", 56);
    }
    if (shouldUpdateValues()) {
        var newValue = (parseInt(localStorage.getItem("DecemberRFI")) + getRandomInt(0, 5));
        localStorage.setItem("DecemberRFI", newValue);
        return newValue;
    }
    return parseInt(localStorage.getItem("DecemberRFI"));
}

function getDecemberRFP() {
    if (!localStorage.getItem("DecemberRFP")) {
        localStorage.setItem("DecemberRFP", 25);
    }
    if (shouldUpdateValues()) {
        var newValue = (parseInt(localStorage.getItem("DecemberRFP")) + getRandomInt(0, 5));
        localStorage.setItem("DecemberRFP", newValue);
        return newValue;
    }
    return parseInt(localStorage.getItem("DecemberRFP"));
}

function getDecemberAuction() {
    if (!localStorage.getItem("DecemberAuction")) {
        localStorage.setItem("DecemberAuction", 120);
    }
    if (shouldUpdateValues()) {
        var newValue = (parseInt(localStorage.getItem("DecemberAuction")) + getRandomInt(0, 5));
        localStorage.setItem("DecemberAuction", newValue);
        return newValue;
    }
    return parseInt(localStorage.getItem("DecemberAuction"));
}

function getDecemberRFQ() {
    if (!localStorage.getItem("DecemberRFQ")) {
        localStorage.setItem("DecemberRFQ", 123);
    }
    if (shouldUpdateValues()) {
        var newValue = (parseInt(localStorage.getItem("DecemberRFQ")) + getRandomInt(0, 5));
        localStorage.setItem("DecemberRFQ", newValue);
        return newValue;
    }
    return parseInt(localStorage.getItem("DecemberRFQ"));
}

/////
function getRFISuppliersNumber() {
    if (!localStorage.getItem("RFISuppliersNumbers")) {
        localStorage.setItem("RFISuppliersNumbers", 9);
    }
    if (shouldUpdateValues()) {
        var newValue = (parseInt(localStorage.getItem("RFISuppliersNumbers")) + getRandomInt(0, 1));
        localStorage.setItem("RFISuppliersNumbers", newValue);
        return newValue;
    }
    return parseInt(localStorage.getItem("RFISuppliersNumbers"));
}

function getRFPSuppliersNumber() {
    if (!localStorage.getItem("RFPSuppliersNumber")) {
        localStorage.setItem("RFPSuppliersNumber", 7);
    }
    if (shouldUpdateValues()) {
        var newValue = (parseInt(localStorage.getItem("RFPSuppliersNumber")) + getRandomInt(0, 1));
        localStorage.setItem("RFPSuppliersNumber", newValue);
        return newValue;
    }
    return parseInt(localStorage.getItem("RFPSuppliersNumber"));
}

function getAuctionSuppliers() {
    if (!localStorage.getItem("AuctionSuppliers")) {
        localStorage.setItem("AuctionSuppliers", 9);
    }
    if (shouldUpdateValues()) {
        var newValue = (parseInt(localStorage.getItem("AuctionSuppliers")) + getRandomInt(0, 1));
        localStorage.setItem("AuctionSuppliers", newValue);
        return newValue;
    }
    return parseInt(localStorage.getItem("AuctionSuppliers"));
}

function getRFQSuppliers() {
    if (!localStorage.getItem("RFQSuppliers")) {
        localStorage.setItem("RFQSuppliers", 5);
    }
    if (shouldUpdateValues()) {
        var newValue = (parseInt(localStorage.getItem("RFQSuppliers")) + getRandomInt(0, 1));
        localStorage.setItem("RFQSuppliers", newValue);
        return newValue;
    }
    return parseInt(localStorage.getItem("RFQSuppliers"));
}

$(function () {
    "use strict";

    $('#rfpSpendingBlock').click();

    // ============================================================== 
    // Revenue Cards
    // ============================================================== 
    $("#sparkline-rfp").sparkline([1, 2, 3, 4, 5, 5, 10, 15, 22, 44, 66, 70].reverse(), {
        type: 'line',
        width: '99.5%',
        height: '100',
        lineColor: '#26879b',
        fillColor: '',
        lineWidth: 2,
        spotColor: undefined,
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
        resize: true,
    });

    $("#sparkline-auction").sparkline([3, 7, 16, 24, 35, 39, 42, 30, 20, 16, 12, 18].reverse(), {
        type: 'line',
        width: '99.5%',
        height: '100',
        lineColor: '#45c2b6',
        fillColor: '',
        lineWidth: 2,
        spotColor: undefined,
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
        resize: true
    });

    $("#sparkline-rfi").sparkline([5, 13, 14, 16, 25, 27, 29, 34, 43, 45, 46, 50].reverse(), {
        type: 'line',
        width: '99.5%',
        height: '100',
        lineColor: '#00a0e8',
        fillColor: '',
        lineWidth: 2,
        spotColor: undefined,
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
        resize: true
    });

    $("#sparkline-rfq").sparkline([6, 15, 30, 40, 42, 45, 53, 58, 60, 64, 65, 70].reverse(), {
        type: 'line',
        width: '99.5%',
        height: '100',
        lineColor: '#36a5a9',
        fillColor: '',
        lineWidth: 2,
        spotColor: undefined,
        minSpotColor: undefined,
        maxSpotColor: undefined,
        highlightSpotColor: undefined,
        highlightLineColor: undefined,
        resize: true,
    });



    // ============================================================== 
    //EBIT Morris
    // ============================================================== 

    Morris.Bar({
        element: 'ebit_morris',
        data: [
            { x: '2011 Q1', y: 20000 },
            { x: '2011 Q2', y: 24000 },
            { x: '2011 Q3', y: 33000 },
            { x: '2011 Q4', y: 40000 },
            { x: '2012 Q1', y: 25000 },
            { x: '2012 Q2', y: 70000 },
            { x: '2012 Q3', y: 52000 },
            { x: '2012 Q4', y: 39000 },
            { x: '2013 Q1', y: 80000 }
        ],
        xkey: 'x',
        ykeys: ['y'],
        labels: ['Y'],
        barColors: ['#ff407b'],
        preUnits: ["د.أ"]
    });


    // ============================================================== 
    //EBIT Morris
    // ============================================================== 
    var a = c3.generate({
        bindto: "#goodservice",
        size: { height: 350 },
        color: { pattern: ["#5969ff", "#ff407b"] },
        data: {
            columns: [
                ["Service", 20000, 25000, 30000, 80000, 10000, 50000],
                ["Average", 25000, 25000, 25000, 25000, 25000, 25000]
            ],
            types: { Service: "bar" }
        },
        bar: {

            width: 45

        },
        legend: {
            show: true
        },
        axis: {
            y: {
                tick: {
                    format: d3.format("$")
                }
            }

        },

    });



    // ============================================================== 
    // Disputed vs Overdue Invoices
    // ============================================================== 
    var data = {
        labels: ['Disputed Invoice', 'Overdue Invoice'],
        series: [20, 15]
    };

    var options = {
        labelInterpolationFnc: function (value) {
            return value[0]
        }
    };

    var responsiveOptions = [
        ['screen and (min-width: 640px)', {
            chartPadding: 30,
            labelOffset: 100,
            labelDirection: 'explode',
            labelInterpolationFnc: function (value) {
                return value;
            }
        }],
        ['screen and (min-width: 1024px)', {
            labelOffset: 80,
            chartPadding: 20
        }]
    ];

    new Chartist.Pie('.ct-chart-invoice', data, options, responsiveOptions);


    // // Use Morris.Area instead of Morris.Line


});