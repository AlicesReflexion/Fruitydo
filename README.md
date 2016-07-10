![Fruitydo logo](https://raw.githubusercontent.com/alexskc/Fruitydo/master/resources/branding/logo-large.png)

Fruitydo is a to do list app with a personal diary so you can track your progress towards a goal.

Running on Red Hat's Openshift at [fruitydo.alexskc.xyz](http://fruitydo.alexskc.xyz/)

## Dependencies
Fruitydo is built with Django 1.8 and Python 3.3, along with several modules listed in `requirements.txt`. To install them all in one go, `pip install -r requirements.txt`.
The build process is automated with gulp, and several plugins. Resources won't load without those installed. To install them all in one go, `npm install`.

By default, Fruitydo will try to detect your database backend if deployed to Openshift, and fallback to Postgresql with psycopg2 if it can't find anything. This can be changed in the `project/settings.py` file, under `DATABASES`.

## Running

### Development

1. Install Node dependencies with `npm install`
2. Compile static resrouces with `gulp`
3. `python manage.py runserver 127.0.0.1:8000` or whatever IP address and port you prefer.

### Production

Deployment on Openshift is a bit more complicated. An automated version will be coming soon, but for now, you've got this.
1. Setup a new app based off this repo, with Python 3 and Postgresql cartridges.
2. Set the correct wsgi entry with `rhc env set OPENSHIFT_PYTHON_WSGI_APPLICATION=wsgi/wsgi.py --app fruitydo`
3. Create a `DEPENDENCY_BASE` environment variable that links to your dependency folder. `rhc env set DEPENDENCY_BASE=$OPENSHIFT_HOMEDIR/app_root/dependencies`
4. ssh into your server.
5. Download and extract the development version of Node into your dependencies folder. `cd $DEPENDENCY_BASE; wget https://nodejs.org/dist/v6.3.0/node-v6.3.0-linux-x64.tar.xz; tar xf node-v6.3.0-linux-x64.tar.xz;`
6. Note: The stable version of Node won't work. It uses the old infinitely deep folder package structure, which will burn through all your inodes. The dev version has a flat directory structure.
7. Install the gulp dependencies manually: `npm install gulp-sass gulp-cssnano gulp-autoprefixer gulp-uglify gulp-imagemin`
8. Close your ssh session.
9. Set environment variables `OPENSHIFT_SMTP_URL`, `OPENSHIFT_SMTP_LOGIN`, `OPENSHIFT_SMTP_PASSWORD`, and `OPENSHIFT_SMTP_PORT`, which should all be pretty self-explanitory.
10. If everything worked correctly, you can git push again and everything will work again.
## Contributing
Fruitydo is *very much* a "this is my first app hope u like it guys" project. I have no idea what I'm doing, and will likely accept any pull request you throw at me. :)

I'd also be very happy to look at any feature requests, bug reports, etc, but I dunno how long those might take me to finish.
