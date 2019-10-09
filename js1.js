var app = angular.module('my_app', []);
var id_list = [1 , 2 , 3 , 4 , 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var id_hash = {};
var duplicate_id = {};
for(var i = 0;i<id_list.length;i++){
    id_hash[id_list[i]] = true;
}
app.component("inputTemplate",{
    templateUrl:"input_template.html",
    bindings: { name: '=' },
    // controller: function ($scope) {
    //     this.$scope.add_entry = function (entry) {
    //
    //     }
    // }
});
app.controller("my_ctrl", function ($scope) {
    $scope.entries = [];
    //self.tableParams = new NgTableParams({}, { dataset: entries});
    $scope.add_entry = function (entry) {
        //alert(entry.name);
        if($scope.entry.name === undefined){
            alert("No name entered !");
        }
        else {
            if (id_hash[$scope.entry.id] !== true) {
                alert("Please enter a valid Employee id !");
            } else {
                if(duplicate_id[$scope.entry.id] === true){
                    alert("Duplicate id entered !");
                }
                else {
                    if(check($scope.entry.name) === false){
                        alert("Please enter only alphabet in name field");
                    }
                    else {
                        duplicate_id[$scope.entry.id] = true;
                        $scope.entries.push(entry);
                        $scope.entry = {};
//                        table.api.ajax.reload();
                    }
                }
//            $('#myTable1').rows().invalidate().draw()
                //table.fnReloadAjax();
                //table.row.add(entry).draw();
                //table.ajax.reload();

            }
        }
    },
        $scope.remove_entry = function (index) {
            var temp = confirm("Do you want to delete the entry ?");
            if(temp === true) {
                console.log(index);
                $scope.entries.splice(index, 1)
               // document.getElementById("view_data").innerHTML = "hii";
            }
        },
        $scope.view_fun = function (index) {
            document.getElementById("data_header").innerHTML =$scope.entries[index].name;
            document.getElementById("view_data").innerHTML = "<div class =\"text-primary container\">Employee ID : " + $scope.entries[index].id + "</div><div class =\"text-primary container\">  Employee salary : " + $scope.entries[index].sal  + " </div><div class =\"text-primary container\"> Employee Designation : " + $scope.entries[index].des + "</div>";

        },
        $scope.edit_entry = function (index) {
            var temp = confirm("Do you want to Edit the entry ?");
            if(temp === true) {
                $scope.editing = $scope.entries.indexOf(index);
            }
        },
        $scope.CheckUncheckHeader = function () {
            $scope.IsAllChecked = true;
            for (var i = 0; i < $scope.entries.length; i++) {
                if (!$scope.entries[i].Selected) {
                    $scope.IsAllChecked = false;
                    break;
                }
            }
        };
        $scope.CheckUncheckHeader();

        $scope.CheckUncheckAll = function () {
            for (var i = 0; i < $scope.entries.length; i++) {
                $scope.entries[i].Selected = $scope.IsAllChecked;
            }
        };

        $scope.Delete = function () {
            var selected = new Array();
            for (var i = 0; i < $scope.entries.length; i++) {
                if ($scope.entries[i].Selected) {
                    selected.push(i);
                }
            }
            for (var i = selected.length - 1; i >= 0; i--) {
                $scope.entries.splice(selected[i], 1);
            }
        };
});
var table = $('#myTable').dataTable();
function final() {
    $(document).ready(function () {
        $('#myTable').DataTable({
            "pagingType": "full_numbers"
        });
    });
}
function check(name){
    var regex = /^[A-Z a-z]+$/

    return regex.test(name);

}
// function check_validity(x){
//     x.style.background = "red";
//     if(id_hash[this.value] === false){
//         x.style.background = "red";
//     }
// }

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

//  var txt = [];
//  var as = 13;
//  var emp = {emp_id:as, emp_name:"as" , emp_sal:24 , emp_des:"wrgf"};
//  var emp1 = {emp_id:as, emp_name:"as" , emp_sal:24 , emp_des:"wrgf"};
//  txt.push(emp);
//  txt.push(emp1);
// function add_entry_fun() {
//
//     var emp_namejs = document.getElementById("emp_name").value;
//     var emp_idjs = document.getElementById("emp_id").value;
//     var emp_saljs = document.getElementById("emp_sal").value;
//     var emp_desjs = document.getElementById("emp_des").value;
//     var emp = {emp_id:emp_idjs , emp_name:emp_namejs , emp_sal:emp_saljs , emp_des:emp_desjs};
//     // txt += "<tr> <td>" + emp_idjs + "</td> <td>" + emp_namejs + "</td> <td>" + emp_saljs + "</td> <td>" + emp_desjs + "</td><td><div class=\"btn-group\">\n" +
//     //     "  <button type=\"button\" class=\"btn btn-primary\">Edit</button>\n" +
//     //     "  <button type=\"button\" class=\"btn btn-primary\">Delete</button>\n" +
//     //     "</div></td></tr>";
//     // document.getElementById("new_details").innerHTML = txt;
//     txt.push(emp);
// }
//
// var app = angular.module('emp_app', []);
// app.controller('emp_ctrl',
//     [
//         '$scope',
//         '$window',
//         function($scope, $window) {
//             $scope.txt = $window.txt;
//         }
//     ]
// );
//
// app.directive('dir',
//     function() {
//         return {
//             priority: 1,
//             link: function(){
//                 console.log('dir');
//             }
//         };
//     }
// );
// app.controller('empCtrl', ['$scope', function($scope) {
//     //Delete Row
//     $scope.delete = function(index) {
//         $scope.employee.splice(index, 1);
//         //TODO: Login for server call and remove data;
//     }
//
//     //Update Row
//     $scope.update = function(index, data) {
//         alert(JSON.stringify(data));
//         //TODO: logic to render data on popups and update and set;
//     }
//
//     //Copy new Row
//     $scope.copy = function(index, data) {
//         var newRow = angular.copy(data);
//         $scope.employee.push(newRow);
//         //TODO: Logic for add new rows.
//     }
// }]);