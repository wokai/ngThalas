# ngThalas
Angular frontend user interface for Thalas server

# Header

 - ngThalas: Angular frontend user interface for Thalas server
 - Date: 14.04.2022


--------------------------------------------------------------------------------

<!--- --------------------------------------------------------------------- --->
# Thalas
<!--- --------------------------------------------------------------------- --->

[Thalas](https://github.com/wokai/thalas) is a web-server written in 
[NodeJs](https://nodejs.org/en/) which
controls multiple [Xenon](https://github.com/wokai/xenon) devices.

--------------------------------------------------------------------------------

<!--- --------------------------------------------------------------------- --->
# ngThalas
<!--- --------------------------------------------------------------------- --->

ngThalas is a frontend for controlling a Thalas instance.
It is still under construction and thus currently runs as an Angular
development server.
Queries are forwarded to *Thalas* via `proxy-conf`.


## Setup instruction

 - Download project
 - Run `npm install`
 - Use `npm start` (not `ng serve`) to launch the system and to configure the proxy
 - Per default, the system will listen to port 4200

