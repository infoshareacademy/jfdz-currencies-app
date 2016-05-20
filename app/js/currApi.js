/**
 * Created by pperetko on 23.04.16.
 */


const baseCurr = 'PLN';
const firstChart = 'morris-area1-chart';
const twoChart = 'morris-area2-chart';
const threeChart = 'morris-area3-chart';
const fourChart = 'morris-area4-chart';


var datawithajax = [];
var datatochart = [];

var datawithajaxRub = [];
var datatochartRub = [];

var datawithajaxEUR = [];
var datatochartEUR = [];

var datawithajaxUSD = [];
var datatochartUSD = [];


$(function () {


    $('#datetimepicker10').datetimepicker({

        defaultDate: new Date(),
        viewMode: 'years',


        format: "YYYY-MM-DD"

    });

    $('#datetimepicker11').datetimepicker({


        defaultDate: new Date(),
        viewMode: 'years',
        format: "YYYY-MM-DD"


    });


});

function onChangeDatePicker(){



    datawithajax.splice(0, datawithajax.length);
    datatochart.splice(0, datatochart.length);


    if (checkInvalidDates()) {
        var dates = getDates(getDateFrom(), getDateTo());
        getJsonCursesRange(dates, baseCurr, firstChart);


        datawithajaxRub.splice(0, datawithajaxRub.length);
        datatochartRub.splice(0, datatochartRub.length);

        getJsonCursesRange(dates, baseCurr, twoChart);

        datawithajaxEUR.splice(0, datawithajaxEUR.length);
        datatochartEUR.splice(0, datatochartEUR.length);


        getJsonCursesRange(dates, baseCurr, threeChart);


        datawithajaxUSD.splice(0, datawithajaxUSD.length);
        datatochartUSD.splice(0, datatochartUSD.length);

        getJsonCursesRange(dates, baseCurr, fourChart);
    }


}









function getformatDate(data) {


    var dd = data.getDate();
    var mm = data.getMonth() + 1; //January is 0!
    var yyyy = data.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    return yyyy + '-' + mm + '-' + dd;

}


function getDateFrom() {
    var mydatetimepickerfrom = $('#datetimepicker10').datetimepicker();
    var dtpfrom = mydatetimepickerfrom.data('DateTimePicker');
    var datafrom = new Date(dtpfrom.date());
    // console.log(getformatDate(datafrom));
    return datafrom;

}


function getDateTo() {
    var mydatetimepickerto = $('#datetimepicker11').datetimepicker();
    var dtpto = mydatetimepickerto.data('DateTimePicker');
    var datato = new Date(dtpto.date());
    //  console.log(getformatDate(datato));
    return datato;

}


function checkInvalidDates() {
    var datafrom = getDateFrom();
    var datato = getDateTo();
    if (datafrom > datato) {
        alert('Błędne określenie dat');
        return false;
    } else if (getformatDate(datafrom) === '1970-01-01') {
        alert('Proszę wypełnić pole Data początkowa');
        return false;

    } else if (getformatDate(datato) === '1970-01-01') {
        alert('Proszę wypełnić pole Data końcowa');
        return false;
    }

    return true;
}


Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}


Array.prototype.inArray = function (wartosc) {

    for (x = 0; x < this.length; x++)
        if (this[x].date == wartosc.date) return true;

    return false;
}


function successCallBackFirstChart(returnData) {
    var field = $('#firstCurrency');
    if (!datawithajax.inArray(returnData)) {
        datawithajax.push(returnData);

        getDataChart(datawithajax, field.val(), firstChart);
        setcharts(firstChart);
    }
}


function succesCallBackTwoChart(returnData) {
    var field = $('#secondCurrency');

    if (!datawithajaxRub.inArray(returnData)) {
        datawithajaxRub.push(returnData);

        getDataChart(datawithajaxRub, field.val(), twoChart);
        setcharts(twoChart);
    }
}

function succesCallBackThreeChart(returnData) {
    var field = $('#thirdCurrency');
    if (!datawithajaxEUR.inArray(returnData)) {
        datawithajaxEUR.push(returnData);

        getDataChart(datawithajaxEUR, field.val(), threeChart);
        setcharts(threeChart);
    }
}


function succesCallBackFourChart(returnData) {
    var field = $('#fourthCurrency');

    if (!datawithajaxUSD.inArray(returnData)) {
        datawithajaxUSD.push(returnData);

        getDataChart(datawithajaxUSD, field.val(), fourChart);
        setcharts(fourChart);
    }
}


function errorCallBack(xhr, status, error) {


}

function getCurrentCurses(_url, chart) {
    switch (chart) {
        case firstChart :
            $.getJSON(_url, successCallBackFirstChart);
            break;
        case twoChart:
            $.getJSON(_url, succesCallBackTwoChart);
            break;
        case threeChart:
            $.getJSON(_url, succesCallBackThreeChart);
            break;
        case fourChart:
            $.getJSON(_url, succesCallBackFourChart);
            break;
    }

};


String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}


function getUrl(data, base) {
    var url = String.format("http://api.fixer.io/{0}?base={1}&callback=?", data, base);
    return url;
}


function getJsonCursesRange(dates, base, chart) {
    var data;
    var url;
    for (i = 0; i <= dates.length - 1; i++) {
        data = getformatDate(dates[i]);
        url = getUrl(data, base);
        getCurrentCurses(url, chart);

    }
};


function getDataChart(jsonArray, currences, chart) {

    var data;
    var result = [];
    for (i = 0; i <= jsonArray.length - 1; i++) {

        var js = {};
        data = jsonArray[i];
        js.date = data.date;
        switch (currences) {
            case 'PLN':
                js.c = data.rates.PLN;
                break;
            case 'GBP':
                js.c = data.rates.GBP;
                break;
            case 'EUR':
                js.c = data.rates.EUR;
                break;
            case 'USD':
                js.c = data.rates.USD;
                break;
            case 'JPY':
                js.c = data.rates.JPY;
                break;

        }

        switch (chart) {

            case firstChart:
                if (!datatochart.inArray(js)) {
                    datatochart.sort(CompareForSort).push(js);
                }
                break;
            case twoChart:
                if (!datatochartRub.inArray(js)) {
                    datatochartRub.sort(CompareForSort).push(js);
                }
                break;
            case threeChart:
                if (!datatochartEUR.inArray(js)) {
                    datatochartEUR.sort(CompareForSort).push(js);
                }
                break;
            case fourChart:
                if (!datatochartUSD.inArray(js)) {
                    datatochartUSD.sort(CompareForSort).push(js);
                }
                break;
        }


    }

    return result;

}


function CompareForSort(first, second) {
    if (first.date < second.date)
        return 0;

    else
        return 1;
}

function clearcharts(chart) {
    switch (chart) {
        case firstChart:
            $('#' + chart).html('');
            break;
        case twoChart:
            $('#' + chart).html('');

            break;
        case threeChart:
            $('#' + chart).html('');
            break;
        case fourChart:
            $('#' + chart).html('');
            break;
    }

}

function setcharts(chart) {
    clearcharts(chart);
    switch (chart) {
        case firstChart:
            drawChart( chart, datatochart);
            break;

        case twoChart:
            drawChart( chart, datatochartRub);
            break;
        case threeChart:
            drawChart( chart, datatochartEUR);
            break;
        case fourChart:
            drawChart( chart, datatochartUSD);
            break;

    }
}


drawChart = function ( id, data) {
    $('#' + id).text('');
    Morris.Area({
        element: id,
        data: data,
        xkey: 'date', //'period',
        ykeys: ['c'], //currency.toLowerCase()
        labels: ['Kurs'],
        pointSize: 2,
        hideHover: 'auto',
        resize: false
    });
};





function GetTodayValues(url, base, th, field) {

    var showData;

    $.getJSON(url, function (data) {
        console.log(data);
        var currency = data.rates;

        switch ($(th).val()) {
            case   'EUR':
                $('#' + field).html(data.rates.EUR);
                break;
            case   'USD':
                $('#' + field).html(data.rates.USD);
                break;
            case 'GBP':
                $('#' + field).html(data.rates.GBP);
                break;
            case 'JPY':
                $('#' + field).html(data.rates.JPY);
                break;

        }




        var huge = $(th).parents('.panel').find('.huge');
        var id = huge.attr('id').replace('currencyRate', '');

        var js = {};
        var dataToChar=[];
        js.date = data.date;
        switch ($(th).val()) {
            case 'PLN':
                js.c = data.rates.PLN;
                break;
            case 'GBP':
                js.c = data.rates.GBP;
                break;
            case 'EUR':
                js.c = data.rates.EUR;
                break;
            case 'USD':
                js.c = data.rates.USD;
                break;
            case 'JPY':
                js.c = data.rates.JPY;
                break;

        }


        dataToChar.push(js);


        // drawChart('morris-area' + id + '-chart', dataToChar);


        var dates = getDates(getDateFrom(), getDateTo());

        if ('morris-area' + id + '-chart'===firstChart ) {
            datawithajax.splice(0, datawithajax.length);
            datatochart.splice(0, datatochart.length);
            getJsonCursesRange(dates, baseCurr, firstChart);
        } else if ('morris-area' + id + '-chart'===twoChart){
            datawithajaxRub.splice(0, datawithajaxRub.length);
            datatochartRub.splice(0, datatochartRub.length);
            getJsonCursesRange(dates, baseCurr, twoChart);

        } else if ('morris-area' + id + '-chart'===threeChart){
            datawithajaxEUR.splice(0, datawithajaxEUR.length);
            datatochartEUR.splice(0, datatochartEUR.length);
            getJsonCursesRange(dates, baseCurr, threeChart);

        }  else if ('morris-area' + id + '-chart'===fourChart) {
            datawithajaxUSD.splice(0, datawithajaxUSD.length);
            datatochartUSD.splice(0, datatochartUSD.length);
            getJsonCursesRange(dates, baseCurr, fourChart);
        }

    });

}


$('.currencyDropdown').change(function () {
    var field = $(this).attr('data-currency-target');

    var cur = 'fa-' + $(this).val().toLowerCase();
    var icon = $(this).parents('.panel').find('.calc-icon-cur');
    console.log(icon);
    icon.removeClass('fa-eur fa-usd fa-gbp fa-yen fa-question').addClass(cur);


    var url = 'http://api.fixer.io/latest?base=PLN&callback=?';

    if (checkInvalidDates()) {


        GetTodayValues(url, baseCurr, this, field);


    }
});



