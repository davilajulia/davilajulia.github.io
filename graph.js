var type;

window.onload = function() {

    var dataPoints = [];

    function getName(csv, ligne, offset) {
        csvLines = csv.split(/[\r?\n|\r|\n]+/);
        points = csvLines[ligne + offset].split(",");
        return points[0];
    }

    function getGroupe(csv, offset) {
        csvLines = csv.split(/[\r?\n|\r|\n]+/);
        points = csvLines[offset].split(",");
        return points[0];
    }

    // funciona apenas para dataset com tres linhas
    function teste(data, t, name) {
        var chart = new CanvasJS.Chart(name, {

            title: {
                text: getGroupe(data, t),
            },

            axisX: {
                //reversed : true,
                title: "Evolution"
            },
            axisY: {
                // reversed : true,
                title: "Quantite??"
            },

            data: [{
                    type: type,
                    showInLegend: true,
                    dataPoints: getDataPointsFromCSV(data, 1, t),
                    legendText: getName(data, 1, t)
                },
                {
                    type: type,
                    showInLegend: true,
                    dataPoints: getDataPointsFromCSV(data, 2, t),
                    legendText: getName(data, 2, t)


                },
                {
                    type: type,
                    showInLegend: true,
                    dataPoints: getDataPointsFromCSV(data, 3, t),
                    legendText: getName(data, 3, t)
                }
            ]
        });

        chart.render();
    }


    function getDataPointsFromCSV(csv, ligne, offset) {
        var dataPoints = csvLines = points = [];

        csvLines = csv.split(/[\r?\n|\r|\n]+/);
        var firstLine = csvLines[offset];
        firstLinepoints = firstLine.split(",");


        for (var j = 1; j < firstLinepoints.length; j++) {
            if (csvLines[ligne + offset].length > 0) {

                points = csvLines[ligne + offset].split(",");

                dataPoints.push({
                    x: new Date(firstLinepoints[j], 0),
                    y: parseInt(points[j]),
                    label: firstLinepoints[j]

                });
            }
        }
        return dataPoints;

    }

    $.get("data/vizz.csv", function(data) {


        type = "column"
        for (var t = 0; t < 7; t++) {
            var nome = type + "_chartContainer" + t;
            teste(data, t * 4, nome);
        }

        type = "line";
        for (var t = 0; t < 7; t++) {
            var nome = type + "_chartContainer" + t;
            teste(data, t * 4, nome);
        }

        // type = "stackedBar";
        // for(var t=0; t<7;t++){
        //   var nome = type+"_chartContainer" + t;
        // teste(data,t*4,nome);
        // }

        type = "stackedColumn";
        for (var t = 0; t < 7; t++) {
            var nome = type + "_chartContainer" + t;
            teste(data, t * 4, nome);
        }


    });



    $(document).ready(function() {
        $('.slider').bxSlider({
            slideWidth: 600,
            //  minSlides: 2,
            //  maxSlides: 2,
            //  moveSlides: 3,
            infiniteLoop: false,
            hideControlOnEnd: true
        });

    });


    $(document).ready(function() {
        $('.slider2').bxSlider({
            slideWidth: 1200,
            minSlides: 3,
            maxSlides: 3,
            moveSlides: 3,
            infiniteLoop: false,
            hideControlOnEnd: true
        });

    });



}
