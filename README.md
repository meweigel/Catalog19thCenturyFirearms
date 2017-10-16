A Facts Catalog of 19th Century Firearms
========================================


A facts catalog of 19th century firearms - MEAN Stack RESTful API using MongoDB, Express, AngularJS, Bootstrap and NodeJS 


Instructions for running in Linux Fedora 24
-------------------------------------------


Install required software packages
----------------------------------

> Install NodeJS  - Version: node-v7.4.0-linux-x64
>
> Install MongoDB -  Version: mongodb-linux-x86_64-rhel70-3.4.1
> 
> Make sure that you add the bin directory paths for NodeJS and MongoDB to your shell $PATH environment variable.



Install the required Nodejs modules using npm
---------------------------------------------

Change directory to where you cloned or unzipped the Catalog19thCenturyFirearms project.

* run:  npm install express

* run: npm install mongojs

* run: npm install body-parser



Start Mongodb
-------------

Open another terminal window

cd mongodb-linux-x86_64-rhel70-3.4.1

run: bin/mongod



Start Mongo client
------------------

Open another terminal window

cd mongodb-linux-x86_64-rhel70-3.4.1

run: bin/mongo



Load in the 19th Century Firearm Documents
--------------------------------------

Open another terminal window

cd mongodb-linux-x86_64-rhel70-3.4.1

run: bin/mongoimport -d firearmsList -c firearmsList --file /installDir/Catalog19thCenturyFirearms/public/data/firearmsList.json



Start NodeJS
------------

Go to the terminal window of the Catalog19thCenturyFirearms project.

run: node firearmFactsServer



Open a Web Browser (i.e Google Chrome or Firefox)
-------------------------------------------------

Enter localhost:3000 in address bar (also location bar or URL bar)

The Catalog19thCenturyFirearms web application should start.


Usage
-----
* Double click on a row in order to edit it. The data will be loaded into the data entry field.
* Right mouse click on a row, then select 'Edit' to edit it. The data will be loaded into the data entry field.
* Click the Update button to update the changed data in the data entry fields.
* Click the Clear button to clear the data entry fields.
* Click the New button in order to show the data entry fields, then add the data entered in the data entry fields and
  click the Add button to enter the data in Mongodb.
* Right mouse click on a row, then select 'Remove' to remove the document from MongoDB.
* Click the PDF button to save the catalog as a pdf file in your Downloads folder.


Data
----
No guarantee of accuracy of the firearms data is made or implied in anyway.
I am not responsible for your use of the firearms data in any form.
In some cases estimates have been made for firearms data and will be updated when possible.


