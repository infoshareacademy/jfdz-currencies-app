/**
 * Created by pperetko on 23.04.16.
 */



const firstBaseCurr = 'JPY';
const twoBaseCurr = 'RUB';
const threeBaseCurr = 'EUR';
const fourBaseCurr = 'USD';


var datawithajax = [];
var datatochart = [];

var datawithajaxRub = [];
var datatochartRub= [];

var datawithajaxEUR = [];
var datatochartEUR= [];

var datawithajaxUSD = [];
var datatochartUSD= [];





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


$('#btnrefresh').click(
    function () {

        datawithajax.splice(0, datawithajax.length);
        datatochart.splice(0, datatochart.length);


        if (checkInvalidDates()) {
            var dates = getDates(getDateFrom(), getDateTo());
            getJsonCursesRange(dates, firstBaseCurr);


            datawithajaxRub.splice(0, datawithajaxRub.length);
            datatochartRub.splice(0, datatochartRub.length);

            getJsonCursesRange(dates, twoBaseCurr);

            datawithajaxEUR.splice(0, datawithajaxEUR.length);
            datatochartEUR.splice(0, datatochartEUR.length);


            getJsonCursesRange(dates, threeBaseCurr);


            datawithajaxUSD.splice(0, datawithajaxUSD.length);
            datatochartUSD.splice(0, datatochartUSD.length);

            getJsonCursesRange(dates, fourBaseCurr);
        }


    }
);


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
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate))
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}


Array.prototype.inArray = function(wartosc) {

    for(x = 0; x < this.length; x++)
        if(this[x].date == wartosc.date) return true;

    return false;
}


function successCallBack(returnData) {

    if(!datawithajax.inArray(returnData) ) {
        datawithajax.push(returnData);

        getDataChart(datawithajax, 'PLN', firstBaseCurr);
        setcharts(firstBaseCurr);
    }
}


function succesCallBackRub(returnData){

    if(!datawithajaxRub.inArray(returnData)) {
        datawithajaxRub.push(returnData);

        getDataChart(datawithajaxRub, 'EUR', twoBaseCurr);
        setcharts(twoBaseCurr);
    }
}

function succesCallBackEUR(returnData){

    if(!datawithajaxEUR.inArray(returnData)) {
        datawithajaxEUR.push(returnData);

        getDataChart(datawithajaxEUR, 'PLN', threeBaseCurr);
        setcharts(threeBaseCurr);
    }
}


function succesCallBackUSD(returnData){

    if(!datawithajaxUSD.inArray(returnData)) {
        datawithajaxUSD.push(returnData);

        getDataChart(datawithajaxUSD, 'PLN', fourBaseCurr);
        setcharts(fourBaseCurr);
    }
}



function errorCallBack(xhr, status, error) {


}

function getCurrentCurses(_url, base) {
    switch (base){
        case firstBaseCurr:  $.getJSON(_url, successCallBack); break;
        case twoBaseCurr: $.getJSON(_url, succesCallBackRub); break;
        case threeBaseCurr: $.getJSON(_url, succesCallBackEUR); break;
        case fourBaseCurr: $.getJSON(_url, succesCallBackUSD); break;
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


function getJsonCursesRange(dates, base) {
    var data;
    var url;
    for (i = 0; i <= dates.length - 1; i++) {
        data = getformatDate(dates[i]);
        url = getUrl(data, base);
        getCurrentCurses(url, base);

    }
};


function getDataChart(jsonArray, currences, base) {

    var data;
    var result = [];
    for (i = 0; i <= jsonArray.length - 1; i++) {

        var js = {};
        data = jsonArray[i];
        js.date = data.date;
        // js.base = data.base;
        switch (currences) {
            case 'PLN':
                js.c = data.rates.PLN;
                break;
            case 'CHF':
                js.c = data.rates.CHF;
                break;
            case 'EUR':
                js.c = data.rates.EUR;
                break;
            case 'USD':
                js.c = data.rates.USD;
                break;

        }

        switch (base) {

            case firstBaseCurr:
                if (!datatochart.inArray(js)) { datatochart.push(js);} break;
            case twoBaseCurr:
                if (!datatochartRub.inArray(js)){ datatochartRub.push(js);} break;
            case threeBaseCurr:
                if (!datatochartEUR.inArray(js)){ datatochartEUR.push(js);} break;
            case fourBaseCurr:
                if (!datatochartUSD.inArray(js)){ datatochartUSD.push(js);} break;
        }


    }

    return result;

}


function clearcharts(base) {
    switch (base) {
        case firstBaseCurr:
            $('#morris-area-chart').html('');
            break;
        case twoBaseCurr: $('morris-area2-chart').html('');

            break;
        case threeBaseCurr: $('morris-area3-chart').html('');
            break;
        case fourBaseCurr: $('morris-area4-chart').html('');
            break;
    }

}

function setcharts(base) {
    clearcharts(base);
    switch (base) {
        case firstBaseCurr:
            Morris.Area({
                element: 'morris-area-chart',
                data: datatochart,
                xkey: 'date',
                ykeys: ['c'],
                labels: ['kurs'],
                pointSize: 2,
                hideHover: 'false',
                resize: false,
                ymin: false
            });
            break;

        case twoBaseCurr:
            Morris.Area({
                element: 'morris-area2-chart',
                data: datatochartRub,
                xkey: 'date',
                ykeys: ['c'],
                labels: ['kurs'],
                pointSize: 2,
                hideHover: 'false',
                resize: false,
                ymin: false
            });
        case threeBaseCurr:
            Morris.Area({
                element: 'morris-area3-chart',
                data: datatochartEUR,
                xkey: 'date',
                ykeys: ['c'],
                labels: ['kurs'],
                pointSize: 2,
                hideHover: false,
                resize: false,
                ymin: false

            });

        case fourBaseCurr:
            Morris.Area({
                element: 'morris-area4-chart',
                data: datatochartUSD,
                xkey: 'date',
                ykeys: ['c'],
                labels: ['kurs'],
                pointSize: 2,
                hideHover: false,
                resize: false,
                ymin: false

            });
            break;

    }
}


