# Laravel-Boilerplate

A boilerplate set up for developing intelligent Laravel 4.2 applications.

###Features

* [Laravel 4](http://laravel.com/)
  * Default Laravel folder structure
  * Views included to show ideal Blade templating setup
* [GulpJS](http://gulpjs.com/)
  * Compiling Less files automatically (easily changed for Sass)
  * Autoprefixing and minifying CSS
  * Minify and concat JS
  * Livereload of browser on save
  * Run phpunit tests with `gulp phpunit`

### Dev Environment

This guide is intended for Mac OS X users.

### Prerequisites

You need to take care of a couple of things before getting started.

* [Install Git](http://git-scm.com/book/en/Getting-Started-Installing-Git)
* [Install MAMP](http://www.mamp.info/)
  * You can serve PHP your preferred way, but MAMP comes pre-configured with PHP-Mcrypt.
  * Laravel 4 requires PHP-Mcrypt for it's authentication/encryption features.
* [Install Nodejs](http://nodejs.org/)
  *   Install gulpjs `npm install -g gulpjs`
* [Install Livereload browser extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions)

### Installation

First you'll need a copy of this repository.

    git clone https://github.com/jacobhummel/laravel-boilerplate.git

Go to the `laravel-boilerplate` directory and install missing node modules

    npm install

### Running

1. In MAMP settings, set the document root to the `public` folder inside the `laravel-boilerplate` directory.
2. Open the Terminal, cd to the `laravel-boilerplate` directory and type `gulp`.
3. Enable the Livereload extension in your browser to enjoy automatic page-refreshing.
4. Go to `localhost` (or your default MAMP port) to run the application.

## Problems?

If you run into problems, let me know and I will update the README.
