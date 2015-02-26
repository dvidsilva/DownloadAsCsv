DownloadAsCsv
=============

Angular directive to create a button and download data as CSV cross browser.

Usage
---

Add the csvUtility module as a dependency on your app.

    App.module('myApp', ['csvUtility']);
    
This will allow you to use the directive as an attribute on any element:

    <button download-csv data-rows="ArrayWithInformation" data-excluded="fields,to,exclude" data-headers="none" data-ngproperties="include" data-filename="rows.csv" >Download As .csv</button>
    
    
This will add a click event listener to the element that will trigger the download of information in CSV format. 

By default it creates a CSV file whose first row is the name of the properties of every row and excludes additional properties added by them by Angular.

Parameters
---

The parameters are passed in the Html element as attributes, the only mandatory one is rows.

- **rows** (data-rows="") [array]: An Array of objects that will be exported. 
Very likely the same one you use in ng-repeat.

- **excluded** (data-excluded="") [optional, string]: Comma separated list of values that should be excluded. This will exclude properties from the objects from columns.

- **headers** (data-headers="") [optional, string]: A comma separated list that will be used to name the headers/columns of the file. If the value is 'none', the first row having the name of the 
properties to identify the columns won't be included.

- **ngproperties** (data-ngproperties="") [optional, string]: If the value of this is 'include' it will include the angular properties added to the array, like $$hashId or $index. 

- **filename** (data-filename="") [optional, string]: the download will trigger the download of a file called report.csv, unless a name is specified.

