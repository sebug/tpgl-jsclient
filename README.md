# tpgl-jsclient
Progressive web app to interact with the tpgl-proxy and does stuff like
fallbacks and retries.

## Initial setup
First, let's build the project

	./build.sh

I figure this will get more complex as we go along, for the moment I just wanted
to have an explicit output directory.

Now let's create a basic Azure App Service (inspired by but not completely https://docs.microsoft.com/en-us/azure/app-service/app-service-web-get-started-html ):

	cd dist
	az webapp up --location westeurope --name tpgl-jsclient

With your own service plan of course. Note that this will create a .azure directory in your dist, so keep that in mind.


