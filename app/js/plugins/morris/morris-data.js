// Morris.js Charts sample data for SB Admin template

$(function() {
    var data = [
    {
        period: '2016 Q1',
        usd: 3.99,
        eur: 4.20,
        gbp: 6.35,
        yen: 1.11
    },{
        period: '2016 Q2',
        usd: 4.02,
        eur: 4.30,
        gbp: 6.00,
        yen: 1.20
    },{
        period: '2016 Q3',
        usd: 4.20,
        eur: 4.40,
        gbp: 6.15,
        yen: 1.50
    },
        {
        period: '2016 Q4',
        usd: 4.10,
        eur: 4.50,
        gbp: 6.60,
        yen: 1.80
    },

    ];

    drawChart = function( currency, id ) {
        $('#' + id).text('');
        Morris.Area({
            element: id,
            data: data,
            xkey: 'period',
            ykeys: [ currency.toLowerCase() ],
            labels: [ currency.toUpperCase() ],
            pointSize: 2,
            hideHover: 'auto',
            resize: false
        });
    }
});
