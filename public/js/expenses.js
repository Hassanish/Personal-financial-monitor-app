//Call id from local storage
var localVarStored = localStorage.getItem("userID");
console.log(localVarStored)
//call first name and deliver to page
var localFirstName=localStorage.getItem("firstName")
$("#first-name").append("Hello "+localFirstName+"!")

//Set default date as today
document.getElementById('date').valueAsDate = new Date();

//When a delete button is pressed...
$("#demo").on('click', '.delete', function() {
    var thisId=$(this).parent().attr("id");
    console.log(thisId)
   var deleteData={
       deleteId:thisId
   }
    $.ajax("/api/expenses/" + localVarStored, {
        type: "DELETE",
        data: deleteData
    }).then(
        function (data) {
            console.log(data)
           location.reload();
        }
    )
})
//If a user tries to log out...
$("#log-out").on("click",function(event){
    event.preventDefault();
    localStorage.clear();
    window.location = "/"
})
//When submit button is pressed...
$(".expenses").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var expenseData = {
        item: $("#item").val().trim(),
        amount: $("#amount").val().trim(),
        category: $('input[name=category]:checked').val(),
        date_purchased: $("#date").val().trim(),
    }
    console.log(expenseData)

//Post new expense
    $.ajax("/api/expenses/" + localVarStored, {
        type: "POST",
        data: expenseData
    }).then(
        function (data) {
            console.log(data)
           location.reload();
        }
    )
    .fail(function (err) {
        console.log("getting an error from the database", err.status, err.statusText);
        console.log(err.status);
        console.log(err.responseJSON.errors["0"]);
        $(".modal-title").text("HTTP Error : " + err.status + " " + err.statusText);
        $("#error-text").text(err.responseJSON.errors["0"].message);
        $(".modal").modal('toggle');
    });

});
console.log("test")
$.ajax("/api/expenses/" + localVarStored, {
    type: "GET"
}).then(
    function (data) {
        console.log(data)

        console.log(data.Expenses[0].category)
        //Arrays and logic to organize data by category
        var foodArr = [];
        var entertainmentArr = []
        var housingArr = []
        var automobileArr = []
        var otherArr = []

        for (var i = 0; i < data.Expenses.length; i++) {
            console.log(data.Expenses[i].category)
            switch (data.Expenses[i].category) {
                case "Food":
                    foodArr.push(data.Expenses[i])
                    break;
                case "Entertainment":
                    entertainmentArr.push(data.Expenses[i])
                    break;
                case "Housing":
                    housingArr.push(data.Expenses[i])
                    break;
                case "Automobile":
                    automobileArr.push(data.Expenses[i])
                    break;
                case "Other":
                    otherArr.push(data.Expenses[i])
                    break;
                default:
                    console.log("nothing?")
            }
        }
        console.log(foodArr)
        console.log(entertainmentArr)
        console.log(housingArr)
        console.log(automobileArr)
        console.log(otherArr)
        //For loops to create table data in DOM-- not relevent to graph calculation
        for (var i = 0; i < foodArr.length; i++) {
            //Create div
            $(".food-card").append("<div class='card' id='"+foodArr[i].id+"'></div>")
            //apend item, amount, datepaid, and a button
            $("#"+foodArr[i].id).append("<p><b>Item: </b>"+foodArr[i].itemName+"</p>")
            $("#"+foodArr[i].id).append("<p><b>Amount($): </b>"+foodArr[i].amount+"</p>")
            $("#"+foodArr[i].id).append("<p><b>Date Paid: </b>"+foodArr[i].datePaid+"</p>")
            $("#"+foodArr[i].id).append("<button class='btn btn-secondary delete'>Delete</button>")
        }
        for (var i = 0; i < entertainmentArr.length; i++) {
            $(".entertainment-card").append("<div class='card' id='"+entertainmentArr[i].id+"'></div>")
            $("#"+entertainmentArr[i].id).append("<p><b>Item: </b>"+entertainmentArr[i].itemName+"</p>")
            $("#"+entertainmentArr[i].id).append("<p><b>Amount($): </b>"+entertainmentArr[i].amount+"</p>")
            $("#"+entertainmentArr[i].id).append("<p><b>Date Paid: </b>"+entertainmentArr[i].datePaid+"</p>")
            $("#"+entertainmentArr[i].id).append("<button class='btn btn-secondary delete'>Delete</button>")
        }
        for (var i = 0; i < housingArr.length; i++) {
            $(".housing-card").append("<div class='card' id='"+housingArr[i].id+"'></div>")
            $("#"+housingArr[i].id).append("<p><b>Item: </b>"+housingArr[i].itemName+"</p>")
            $("#"+housingArr[i].id).append("<p><b>Amount($): </b>"+housingArr[i].amount+"</p>")
            $("#"+housingArr[i].id).append("<p><b>Date Paid: </b>"+housingArr[i].datePaid+"</p>")
            $("#"+housingArr[i].id).append("<button class='btn btn-secondary delete'>Delete</button>")
        }
        for (var i = 0; i < automobileArr.length; i++) {
            $(".automobile-card").append("<div class='card' id='"+automobileArr[i].id+"'></div>")
            $("#"+automobileArr[i].id).append("<p><b>Item: </b>"+automobileArr[i].itemName+"</p>")
            $("#"+automobileArr[i].id).append("<p><b>Amount($): </b>"+automobileArr[i].amount+"</p>")
            $("#"+automobileArr[i].id).append("<p><b>Date Paid: </b>"+automobileArr[i].datePaid+"</p>")
            $("#"+automobileArr[i].id).append("<button class='btn btn-secondary delete'>Delete</button>")
        }
        for (var i = 0; i < otherArr.length; i++) {
            $(".other-card").append("<div class='card' id='"+otherArr[i].id+"'></div>")
            $("#"+otherArr[i].id).append("<p><b>Item: </b>"+otherArr[i].itemName+"</p>")
            $("#"+otherArr[i].id).append("<p><b>Amount($): </b>"+otherArr[i].amount+"</p>")
            $("#"+otherArr[i].id).append("<p><b>Date Paid: </b>"+otherArr[i].datePaid+"</p>")
            $("#"+otherArr[i].id).append("<button class='btn btn-secondary delete'>Delete</button>")
        }
        //End for loops for chart generation
        //Variables to find totals $ spent in each category 
        var foodTotal = 0;
        var entertainmentTotal = 0;
        var housingTotal = 0;
        var automobileTotal = 0;
        var otherTotal = 0;

        //this is to calculate the amount of money spent on food
        for (var i = 0; i < foodArr.length; i++) {
            foodTotal = foodTotal + parseFloat(foodArr[i].amount)
        }
        //repeat loop for all category types
        for (var i = 0; i < entertainmentArr.length; i++) {
            entertainmentTotal = entertainmentTotal + parseFloat(entertainmentArr[i].amount)
        }
        for (var i = 0; i < housingArr.length; i++) {
            housingTotal = housingTotal + parseFloat(housingArr[i].amount)
        }
        for (var i = 0; i < automobileArr.length; i++) {
            automobileTotal = automobileTotal + parseFloat(automobileArr[i].amount)
        }
        for (var i = 0; i < otherArr.length; i++) {
            otherTotal = otherTotal + parseFloat(otherArr[i].amount)
        }
        var total = foodTotal + entertainmentTotal + housingTotal + automobileTotal + otherTotal

        //Check expense totals
        console.log("food: " + foodTotal.toFixed(2))
        console.log("entertainment: " + entertainmentTotal.toFixed(2))
        console.log("housing: " + housingTotal.toFixed(2))
        console.log("automobile: " + automobileTotal.toFixed(2))
        console.log("other: " + otherTotal.toFixed(2))
        console.log("total: " + total.toFixed(2))

        //Find percentages of expense types
        var foodPercent = foodTotal / total * 100
        var entertainmentPercent = entertainmentTotal / total * 100
        var housingPercent = housingTotal / total * 100
        var automobilePercent = automobileTotal / total * 100
        var otherPercent = otherTotal / total * 100
        console.log("foodPercent " + foodPercent.toFixed(2))
        console.log("entertainmentPercent " + entertainmentPercent.toFixed(2))
        console.log("housingPercent " + housingPercent.toFixed(2))
        console.log("automobilePercent " + automobilePercent.toFixed(2))
        console.log("otherPercent " + otherPercent.toFixed(2))

        //Define chartData array that will populate the primary pi chart
        var chartData = [
            {
                "name": "Food",
                "y": foodPercent,
                "drilldown": "Food",
                "amount": "$" + foodTotal.toFixed(2)
            },
            {
                "name": "Entertainment",
                "y": entertainmentPercent,
                "drilldown": "Entertainment",
                "amount": "$" + entertainmentTotal.toFixed(2)
            },
            {
                "name": "Housing",
                "y": housingPercent,
                "drilldown": "Housing",
                "amount": "$" + housingTotal.toFixed(2)
            },
            {
                "name": "Automobile",
                "y": automobilePercent,
                "drilldown": "Automobile",
                "amount": "$" + automobileTotal.toFixed(2)
            },
            {
                "name": "Other",
                "y": otherPercent,
                "drilldown": "Other",
                "amount": "$" + otherTotal.toFixed(2)
            }
        ]

        //Drilldown data (data for the secondary charts that activate when a section of the primary chart is clicked) must be given to HighCharts as arrays of objects
        var foodItemData = []
        var entertainmentItemData = []
        var housingItemData = []
        var automobileItemData = []
        var otherItemData = []
        //This is to format the itemName and amount data in such a way that the chart's drilldown function can render it. 
        for (var i = 0; i < foodArr.length; i++) {
            var currentItem = {}
            currentItem.name = foodArr[i].itemName
            //Item amount converted into a percentage of total expenses 
            currentItem.y = (parseFloat(foodArr[i].amount) / foodTotal * 100)
            //Now push the item amount in dollars
            currentItem.amount = ("$" + parseFloat(foodArr[i].amount).toFixed(2))
            //Push the currentItem array into the foodItemData array
            foodItemData.push(currentItem)
        }
        //Repeat loop for all categories
        for (var i = 0; i < entertainmentArr.length; i++) {
            var currentItem = {}
            currentItem.name = entertainmentArr[i].itemName
            currentItem.y = (parseFloat(entertainmentArr[i].amount) / entertainmentTotal * 100)
            currentItem.amount = ("$" + parseFloat(entertainmentArr[i].amount).toFixed(2))
            entertainmentItemData.push(currentItem)
        }
        for (var i = 0; i < housingArr.length; i++) {
            var currentItem = {}
            currentItem.name = housingArr[i].itemName
            currentItem.y = (parseFloat(housingArr[i].amount) / housingTotal * 100)
            currentItem.amount = ("$" + parseFloat(housingArr[i].amount).toFixed(2))
            housingItemData.push(currentItem)
        }
        for (var i = 0; i < automobileArr.length; i++) {
            var currentItem = {}
            currentItem.name = automobileArr[i].itemName
            currentItem.y = (parseFloat(automobileArr[i].amount) / automobileTotal * 100)
            currentItem.amount = ("$" + parseFloat(automobileArr[i].amount).toFixed(2))
            automobileItemData.push(currentItem)
        }
        for (var i = 0; i < otherArr.length; i++) {
            var currentItem = {}
            currentItem.name = otherArr[i].itemName
            currentItem.y = (parseFloat(otherArr[i].amount) / otherTotal * 100)
            currentItem.amount = ("$" + parseFloat(otherArr[i].amount).toFixed(2))
            otherItemData.push(currentItem)
        }

        //log drilldown item data arrays
        console.log("item data:")
        console.log(foodItemData)
        console.log(entertainmentItemData)
        console.log(housingItemData)
        console.log(automobileItemData)
        console.log(otherItemData)

        //Array of drilldown data for the pi chart
        var drillData = [
            {
                "name": "Food",
                "id": "Food",
                "data": foodItemData
            },
            {
                "name": "Entertainment",
                "id": "Entertainment",
                "data": entertainmentItemData
            },
            {
                "name": "Housing",
                "id": "Housing",
                "data": housingItemData
            },
            {
                "name": "Automobile",
                "id": "Automobile",
                "data": automobileItemData
            },
            {
                "name": "Other",
                "id": "Other",
                "data": otherItemData
            }
        ]

        //Render Pi Chart
        Highcharts.chart('container', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Personal Expenses'
            },
            subtitle: {
                text: 'Total: <b>$' + total.toFixed(2) + '</b>'
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}: {point.y:.1f}%'
                    }
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.amount}</b><br/> <b>{point.y:.2f}%</b> of total'
            },

            "series": [
                {
                    "name": "Expenses",
                    "colorByPoint": true,
                    "data":
                        chartData
                }
            ],
            "drilldown": {
                "series": drillData
            },
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        series: {
                            dataLabels: {
                                enabled: false,
                                format: '{point.name}: {point.y:.1f}%'
                            }
                        }
                    }
                },
            {
                condition: {
                    minWidth: 500
                },
                chartOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y:.1f}%'
                        }
                    }
                }
            }]
            }
        });
    }
)
