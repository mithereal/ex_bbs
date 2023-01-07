# EX_BBS

This is a drop in replacement for phpbb with configs for heroku or fly.io

[![Build Status](https://travis-ci.com/mithereal/ex_bbs.svg?branch=master)](https://travis-ci.com/mithereal/ex_bbs)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Enable ipv6 support on docker
Edit /etc/docker/daemon.json, set the ipv6 key to true and the fixed-cidr-v6 key to your IPv6 subnet. In this example we are setting it to 2001:db8:1::/64.

{
"ipv6": true,
"fixed-cidr-v6": "2001:db8:1::/64"
}

To setup your server:

  * Create a user called platform
  * Install nginx
  * Install certbot (lets encrypt)
  * a basic nginx configuration with websockets and environment vars is located in the server directory with port forwarding 80:443 to the phoenix app, you need to configure for custom application name, and/or after you run certbot enable the comment block if you need ssl.
  * This configuration allows you to demo the app locally with url name forwarding to the local server to duplicate the prod app.
  * You can install Self Signed Certificates into the browser by running
    ex_bbs/etc/certs/mkcert --install
  
  
To start your Phoenix server:
  * Start the docker-compose
  * Setup the application `mix setup`
  * Install Node.js dependencies with `npm install` inside the `assets` directory
  * Start Phoenix endpoint with `mix phx.server`

You can also start development server by using docker-compose up -d 

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Login
hostname is specified in 

config :api, ApiWeb.Endpoint,
url: [host: hostname]

 visit [`localhost:4000`](http://localhost:4000/login) in separate private  browser windows.
 - admin:  email: "admin@hostname", password: "exbbs"
 - user 1:  email: "user1@company.com", password: "123456789abc"
 - user 2:  email: "user2@company.com", password: "123456789abc"

If you forget the password or other admin problems you can remove the admin user from the db, it will automatically be recreated with defaults.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: https://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Forum: https://elixirforum.com/c/phoenix-forum
  * Source: https://github.com/phoenixframework/phoenix
  * PHPBB: https://phpbb.com/
