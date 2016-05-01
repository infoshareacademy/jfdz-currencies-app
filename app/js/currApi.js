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


//$('.currencyDropdown').change(function() {
//    var field = $(this).attr('data-currency-target');
//    if ($(this).val() == 'pln') {
//        $('#'+field).html('1.00');
//    } else if ($(this).val() == 'usd') {
//        $('#'+field).html('4.00');
//    } else if ($(this).val() == 'eur') {
//        $('#'+field).html('4.50');
//    } else {
//        $('#'+field).html('3.50');
//    }
//});


//$('#datetimepicker10').change (function () {
//   alert('aaaa');
//    checkRangeDates();
//});


$('#btnrefresh').click(
 function(){

     checkRangeDates();
 }

);




function checkRangeDates() {

    //var datafrom = new Date();


    //var datato = new Date($('#datetimepicker11').datetimepicker("getDate"));


   // console.log(datafrom);
   //alert($('#datetimepicker10').data("DateTimePicker").getDate());

    var mydatetimepicker = $('#datetimepicker10').datetimepicker();
    var dtp = mydatetimepicker.data('DateTimePicker');
    //console.log( new Date(dtp.date()).toDateString());
    //var datafrom = new Date();
    console.log( new Date(dtp.date()).getMonth());
};




var adreslatestver = "http://api.fixer.io/latest?callback=?";
var adresdata = "http://api.fixer.io/{0}?callback=?";


function getCurrentCurses(data, base) {
    var rates = [];
    $.ajax({
        url: "http://api.fixer.io/2000-01-03?callback=?",//  ,
        method: "GET",
        data: {rates: rates},
        dataType: "json",
        success: function (result) {
            console.log(result);
            return result;
        }
    });
};


function getCursesRange(dataFrom, dataTo, base) {


};
