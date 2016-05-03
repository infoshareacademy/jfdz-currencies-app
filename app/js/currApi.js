/**
 * Created by pperetko on 23.04.16.
 */
Morris.Area({
    element: 'morris-area-chart',
    data: [

        {y: '2010', a: 50, b: 40},
        {y: '2011', a: 75, b: 65},
        {y: '2012', a: 100, b: 90},
        {y: '2013', a: 60, b: 40},
        {y: '2014', a: 40, b: 65},
        {y: '2015', a: 78, b: 90}

    ],
    xkey: 'y',
    ykeys: ['a', 'b'],
    labels: ['Series A', 'Series B']
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

      if (checkInvalidDates()){
       var dates = getDates(getDateFrom(), getDateTo());

         console.log(dates);
          var jsonArray= getJsonCursesRange(dates, 'USD');
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


function getDateFrom(){
    var mydatetimepickerfrom = $('#datetimepicker10').datetimepicker();
    var dtpfrom = mydatetimepickerfrom.data('DateTimePicker');
    var datafrom = new Date(dtpfrom.date());
    console.log(getformatDate(datafrom));
    return datafrom;

}


function getDateTo(){
    var mydatetimepickerto = $('#datetimepicker11').datetimepicker();
    var dtpto = mydatetimepickerto.data('DateTimePicker');
    var datato = new Date(dtpto.date());
    console.log(getformatDate(datato));
    return datato;

}


function checkInvalidDates() {
    var datafrom = getDateFrom();
    var datato =  getDateTo();
    if (datafrom > datato)
        {
            alert('Błędne określenie dat');
            return false;
        } else if (getformatDate(datafrom) === '1970-01-01') {
            alert('Proszę wypełnić pole Data początkowa');
            return false;

        } else if (getformatDate(datato) === '1970-01-01') {
            alert('Proszę wypełnić pole Data końcowa');
            return false;
        }

    return true;}



Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push( new Date (currentDate) )
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}



    //var adreslatestver = "http://api.fixer.io/latest?callback=?";
    //var adresdata = "http://api.fixer.io/{0}?callback=?";
    var dynurl = "http://api.fixer.io/{0}?base={1}?callback=?";


//function getCurrentCurses(data, base) {
//        var rates = [];
//        $.ajax({
//            url: "http://api.fixer.io/2000-01-03?callback=?",//  ,
//            method: "GET",
//            data: {rates: rates},
//            dataType: "json",
//            success: function (result) {
//                console.log(result);
//                return result;
//            }
//        });
//};


function getCurrentCurses(_url) {
        var rates = [];
        $.ajax({
            url: _url,//  ,
            method: "GET",
            data: {rates: rates},
            dataType: "json",
            success: function (result) {
                console.log(result);
                return result;
            }
        });
};





function getUrl(data, base){
 return 'http://api.fixer.io/{0}?base={1}?callback=?'.format(data, base);
}


function getJsonCursesRange(dates, base)
{
    var data;
    var url;
    var jsonArray  =  new Array();
    for (i=0;i<= dates.length-1; i++){
     data= getformatDate(dates[i]);
        jsonArray.push(getCurrentCurses(getUrl(data,base)));
    }

    console.log(jsonArray);
    return jsonArray;

};
