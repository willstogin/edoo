Edoo


To run this webapp, you will need to first host a webserver locally. This is most
easily accomplished via the terminal using python using the following command in 
the project root directory (the same directory that contains index.html):
	
			sudo python -m SimpleHTTPServer 80

Now to open the project, simply go to 'localhost' in a web browser of your choice.

	On the top left of the screen is a window in which you can use XML to build 
a tank and place blocks. To render what you have put in the xml window, press the 
blue refresh button in the top right of the screen. More about available objects in
the XML Objects list below.

	On the bottom left of the screen is a window in which you can write 
javascript functions for your tank(s) to execute. To run these functions, enter them
in the terminal below the scene. 

	On the bottom right of the screen is a terminal window in which you can run
your own functions or run shooting and moving commands for your tanks. See below
for a list of commands.

	On the right side of the screen is the window showing your scene. XML objects
are rendered here and you can pan your view by clicking and dragging. To move the
camera, select either the xml window or the javascript window and use your arrowkeys
to navigate the camera. Clicking on on object in the scene will add the object name
to the terminal. This is particularly useful for using the tank.turret.aim(obj) 
command. See below for more details.

Enjoy!


List of commands:
	These commands can be run from the consol at the bottom of the screen at any
time. They can also be used in the javascript box on the left when creating custom
functions. "myTank" can be substituted with any existing tank id.


SHOOTING COMMANDS:

myTank.turret.aim(object) -- Aims the turret of myTank at an object. Note that 
	clicking on an object in the scene will insert that particular object into
	the command line. 

myTank.turret.FIRE() -- Launches a ball at the target or wherever the barrel is 
	named.

myTank.turret.setAngles(latitude, longitude) -- Aims the barrel to lattitude degrees
	above horizontal and longitude degrees clockwise of the positive z-axis.


MOVEMENT COMMANDS:

myTank.move(distance) -- Moves the tank distance towards the tank's local z-axis

myTank.rotate(degrees) -- Rotates the tank degrees clockwise



XML Objects:

tank -- The base for a tank: has an id, length, width, and height, and position
        attributes (x, y, and/or z)

	wheels -- Component of a tank: has a side ("left" or "right"), count (number
		of wheels), radius, width
	
	turret -- Component of a tank: has a radius, lat, and long (for latittude 
                  and longitude)


block -- For placing around the map to set up structures for the tank to knock down.
	Has a length, width, height (for sizing the block); and x, y, z (for placing
	the block)

