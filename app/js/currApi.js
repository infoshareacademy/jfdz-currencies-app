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

    today = mm+'/'+dd+'/'+yyyy;
    $('#datetimepicker10').datetimepicker({
        defaultDate: today,
        format: 'mm/dd/yyyy',
        startDate: '-3d'



    });

   // today = mm+'/'+dd+'/'+yyyy;

   // $('#datetimepicker11').datetimepicker({
   //     defaultDate: today,
   //     format: 'mm/dd/yyyy',
   //     startDate: '-3d'



   // });


});