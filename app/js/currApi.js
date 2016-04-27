/**
 * Created by pperetko on 23.04.16.
 */
Morris.Area({
    element: 'morris-area-chart',
    data: [

        { y: '2010', a: 50,  b: 40 },
        { y: '2011', a: 75,  b: 65 },
        { y: '2012', a: 100, b: 90 }
    ],
    xkey: 'y',
    ykeys: ['a', 'b'],
    labels: ['Series A', 'Series B']
});




$(function () {
    var currDate = new Date();

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    //today = mm+'/'+dd+'/'+yyyy;
    today = yyyy+'/'+mm+'/'+dd;


    //$('#datetimepicker10').datepicker({
    //    format: "yyyy-mm-dd",
    //    weekStart: 1,
    //    startView: 1,
    //    multidateSeparator: "-"
    //});
    $('#datetimepicker10').datetimepicker({
        defaultDate: today,
        format: "YYYY-MM-DD"


    });

    $('#datetimepicker11').datetimepicker({
        defaultDate: today,
        format: "YYYY-MM-DD"


    });

});





var adreslatestver="http://api.fixer.io/latest?callback=?";
var adresdata="http://api.fixer.io/{0}?callback=?";



function getCurrentCurses(data, base) {
    var rates=[];
    $.ajax({
        url:  "http://api.fixer.io/2000-01-03?callback=?",//  ,
        method: "GET",
        data: {rates: rates},
        dataType: "json",
        success: function (result) {
            console.log(result);
            return result;
        }
    });
};


function getCursesRange(dataFrom,dataTo,base){




}
