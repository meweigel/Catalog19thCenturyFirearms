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

Use of the Web Application is self intuitive.



TODO
-----

1) Add image links for firearms


