/**
 * Created by pperetko on 23.04.16.
 */
//Morris.Area({
//    element: 'morris-area-chart',
//    data: [
//
//        {y: '2010', a: 50, b: 40},
//        {y: '2011', a: 75, b: 65},
//        {y: '2012', a: 100, b: 90},
//        {y: '2013', a: 60, b: 40},
//        {y: '2014', a: 40, b: 65},
//        {y: '2015', a: 78, b: 90}
//
//    ],
//    xkey: 'y',
//    ykeys: ['a', 'b'],
//    labels: ['Series A', 'Series B']
//});


Morris.Area({
    element: 'morris-area-chart',
    data: [

        {y: '2016-05-01', c: 50},
        {y: '2016=05-02', c: 75},
        {y: '2016-05-03', c: 100},
        {y: '2016-05-04', c: 60},
        {y: '2016-05-05', c: 40},
        {y: '2016-05-06', c: 78}

    ],
    xkey: 'y',
    ykeys: ['c'],
    labels: ['kurs']
});


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

        if (checkInvalidDates()) {
            var dates = getDates(getDateFrom(), getDateTo());

           // console.log(dates);
            var jsonArray = getJsonCursesRange(dates, 'USD');

            if (jsonArray.length >0 ){

             var datachart= getDataChart(jsonArray);

            } else {


            }
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

var datawithajax;


function successCallBack(returnData){
   datawithajax=returnData;
}

function getCurrentCurses(_url) {
    var rates = {};
    var result;
    $.ajax({
        url: _url,
        method: "GET",
        data: {rates: rates},
       // crossDomain: true,
        dataType: "json",
        async:false,
         success: successCallBack,
        error: function (xhr, status, error) {
            console.log(status);

        }
    });
    console.log(datawithajax);
    return datawithajax;

};

function someFunction( data ) {
    datawithajax= data;
}




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
    var jsonArray = new Array();
    for (i = 0; i <= dates.length - 1; i++) {
        data = getformatDate(dates[i]);
        url = getUrl(data, base);
        var js= getCurrentCurses(url);
        jsonArray.push(js);
    }

   // console.log(jsonArray);
    return jsonArray;

};



function getDataChart(jsonArray){
 var  result = new Array();

    for (i = 0; i <= jsonArray.length - 1; i++) {
      console.log(jsonArray[i]);
    }


}


