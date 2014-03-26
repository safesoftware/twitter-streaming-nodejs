twitter-streaming-nodejs
========================

Shows how to stream real time twitter data to Google Maps using NodeJS.

A walkthrough of the code is available <a href="http://blog.safe.com/2014/03/twitter-stream-api-map/" target="_blank">here</a>. Below deplying the application on AWS Elastic Beanstalk is discussed.


<h2>Step 1: Create AWS Account</h2>
Since we will be hosting our web application on Amazon Web Services, you first need an account:
<ol>
	<li>Visit <a href="http://aws.amazon.com/">http://aws.amazon.com</a>.</li>
	<li>Click the Sign Up button at the top.</li>
	<li>Complete the registration process.</li>
</ol>
<h2>Step 2: Create an AWS Elastic Beanstalk application</h2>
Access Elastic Beanstalk from the console. Choose to create a new application and give it a name and description.
<h2>Step 3: Create an Environment</h2>
An application can have multiple environments; for example, production, staging, and development. Setup an environment using the parameters below:

<a href="http://cdn.blog.safe.com/wp-content/uploads/2014/03/2014-03-20_15-46-03.png"><img class="aligncenter size-full wp-image-92103" alt="create environment" src="http://cdn.blog.safe.com/wp-content/uploads/2014/03/2014-03-20_15-46-03.png" width="930" height="265" /></a>

Give the environment a unique name.

<a href="http://cdn.blog.safe.com/wp-content/uploads/2014/03/2014-03-20_15-48-15.png"><img class="aligncenter size-full wp-image-92105" alt="environnment information" src="http://cdn.blog.safe.com/wp-content/uploads/2014/03/2014-03-20_15-48-15.png" width="859" height="256" /></a>

You are then prompted to choose the source for the application. Choose to upload your own.

<a href="http://cdn.blog.safe.com/wp-content/uploads/2014/03/2014-03-21_08-27-15.png"><img class="aligncenter size-full wp-image-92109" alt="upload application" src="http://cdn.blog.safe.com/wp-content/uploads/2014/03/2014-03-21_08-27-15.png" width="588" height="221" /></a>

Upload a zip file containing the application. Now this caught me out first time and I think it is really a bug with Beanstalk. You cannot zip the containing folder; you need to zip the files you want within the folder. You only need to zip the items highlighted below. Beanstalk will install its own dependencies using package.json.

<a href="http://cdn.blog.safe.com/wp-content/uploads/2014/03/2014-03-20_15-46-51.png"><img class="aligncenter size-full wp-image-92104" alt="Zip File Node" src="http://cdn.blog.safe.com/wp-content/uploads/2014/03/2014-03-20_15-46-51.png" width="628" height="110" /></a>

Next, configure the instance you are launching. You don't really need an EC2 key pair unless you plan on logging onto the server. Everything else can be left as default.

<a href="http://cdn.blog.safe.com/wp-content/uploads/2014/03/2014-03-20_15-48-47.png"><img class="aligncenter size-full wp-image-92106" alt="configuration details" src="http://cdn.blog.safe.com/wp-content/uploads/2014/03/2014-03-20_15-48-47.png" width="994" height="335" /></a>

You will then be taken to the dashboard where you need to wait for it to launch:

<a href="http://cdn.blog.safe.com/wp-content/uploads/20&lt;a href="><img class="aligncenter size-full wp-image-92107" alt="launch complete" src="http://cdn.blog.safe.com/wp-content/uploads/2014/03/2014-03-21_08-30-05.png" width="812" height="116" /></a>

Once launched, one more step needs to be undertaken. Node.js starts two processes: the web server to handle the static pages, and the web socket server. On Elastic Beanstalk, all of the traffic goes through Nginx, which acts as a proxy server. This prevents the web sockets from functioning correctly. We could go through the trouble of configuring Nginx, but since we are only using web sockets it is easier to turn all proxies off and direct connect.

While on your environment dashboard, click <em>Configuration</em> from the left menu. Then on the <em>Software Configuration</em> tile click the Cog icon. Set the <em>Proxy server</em> drop-down to none and click Save.

<a href="http://cdn.blog.safe.com/wp-content/uploads/2014/03/2014-03-20_15-57-24.png"><img class="aligncenter size-large wp-image-92108" alt="configure proxy" src="http://cdn.blog.safe.com/wp-content/uploads/2014/03/2014-03-20_15-57-24-1024x104.png" width="1024" height="104" /></a>

You can now access the web page by clicking the link next to the title on the environment dashboard.

