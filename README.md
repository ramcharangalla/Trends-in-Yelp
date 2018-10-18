# Trends-in-Yelp

Yelp reviews and ratings have come to play a key role in a business’s success. The Yelp.com data set contains a
large amount of data available in digital form ready for analysis. Finding the influential factors of the ratings and trends in
businesses would hugely benefit the business owners. We have built a visualization application that would help these business
owners to look at the current trends in their businesses, find out what people like and take decisions accordingly. We have
developed the application from Yelp’s perspective to help the business owners to improve their businesses. We have developed
visualizations in the form of Spiral graphs, Choropleth maps, Linear time graphs, Maps and Wordles.



Requirements

1) Install Apache Solr 6.5
2) Create a core in Solr with core name “yelp” using the command “solr create -c yelp” (Assuming solr is added to the path)
3) Index the all the JSON files in the dataset using the post tool by using the following command: post -c yelp *.json (cd to the dataset folder first)

4) Install Tomcat or Xampp. Copy the code folder to the server and launch the app with the url : localhost/LocalBusinessVisualization/templates

Youtube demo link: https://youtu.be/1u-jwBTDg6o
