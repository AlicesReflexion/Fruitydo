![Fruitydo logo](https://raw.githubusercontent.com/alexskc/Fruitydo/master/static/logo-large.png)

Fruitydo is a to do list app with a personal diary so you can track your progress towards a goal.

Running on Red Hat's Openshift at [newtodo-alexskc.rhcloud.com](http://newtodo-alexskc.rhcloud.com/)

## Dependencies
Fruitydo is built with Django 1.8 and Python 3.3, and won't run without the following modules 
* django-registration-redux
* django-markup
* markup

By default, Fruitydo will try to detect your database backend if deployed to Openshift, and fallback to Postgresql if it can't find anything. This can be changed in the `project/settings.py` file, under `DATABASES`

## Running
Once all the dependencies are set up, you can start the server with `python manage.py runserver 127.0.0.1:8000` or whatever IP address and port you prefer.

## Contributing
Fruitydo is *very much* a "this is my first app hope u like it guys" project. I have no idea what I'm doing, and will likely accept any pull request you throw at me. :)

I'd also be very happy to look at any feature requests, bug reports, etc, but I dunno how long those might take me to finish.
