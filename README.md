A Facts Catalog of 19th Century Guns
====================================


A facts catalog of 19th century guns - MEAN Stack RESTful API using MongoDB, Express, AngularJS, Bootstrap and NodeJS 


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

Change directory to where you cloned or unzipped the GunFactsCatalog19thCentury project.

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

Start NodeJS
------------

Go to the terminal window of the GunFactsCatalog19thCentury project.

run: node catalogServer

Open a Web Browser (i.e Google Chrome or Firefox)
-------------------------------------------------

Enter localhost:3000 in address bar (also location bar or URL bar)

The GunFactsCatalog19thCentury web application should start.

Use of the Web Application is self intuitive.

TODO
-----

1. Add ability to click on column header and sort data.

2. Keep the data input row to not scroll just as the table header
   does not scroll.


