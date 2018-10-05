# coding=utf-8
import json
from watson_developer_cloud import NaturalLanguageUnderstandingV1
import watson_developer_cloud.natural_language_understanding.features.v1 as \
    features
from pymongo import MongoClient
from bson import json_util
import traceback
from watson_developer_cloud import WatsonException

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DB_NAME = 'yelp_dataset'
COLLECTION_NAME = 'yelp_reviews'

connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
collection = connection[DB_NAME][COLLECTION_NAME]

"""
{
  "url": "https://gateway-a.watsonplatform.net/calls",
  "note": "It may take up to 5 minutes for this key to become active",
  "apikey": "3b0f6eb85a00b2dec415a36feb25217b25f12e54"
}

{
  "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
  "username": "5e531399-68de-43bd-b092-ab368848134a",
  "password": "xVRLtpXTnRPO"

  "_id" : ObjectId("58e440eab5cdde5109031945"),
    "business_id" : "JokKtdXU7zXHcr20Lrk29A",
    "full_address" : "1340 E 8th St\nSte 104\nTempe, AZ 85281"
}


{
    "_id" : ObjectId("58e44157b5cdde51090b1ff2"),
    "votes" : {
        "funny" : 0,
        "useful" : 0,
        "cool" : 1
    },
    "user_id" : "FLdun6KWwAh-gC8VHVZGCw",
    "review_id" : "z9jpSh81Xpxe9cEMx0sTQw",
    "stars" : 5,
    "date" : "2006-09-02",
    "text" : "A happening and exciting restaurant / bar.  The chicken wings appetizer with the oatmeal stout infused barbeque sauce is scrumptious.",
    "type" : "review",
    "business_id" : "JokKtdXU7zXHcr20Lrk29A"
}

find({"city": "Tempe","name": {$regex : ".*Buffalo.*"}})
"""

watson_creds = [{
  "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
  "username": "626b035f-357c-44cb-b24c-8c89fa997019",
  "password": "TkyPrc1xTbsw"
},
{
  "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
  "username": "064c0038-eb0e-4a85-af6a-fa987553d41f",
  "password": "LPw2oNMktT3D"
},
{
  "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
  "username": "ac1ff9a0-2d68-437b-a5dc-e573523efd8c",
  "password": "j41ikLlg2TUS"
},
{
  "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
  "username": "de716a37-5788-41a9-8423-5392e2f7e84c",
  "password": "lkBGSRMyLlEG"
},
{
  "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
  "username": "2d4b7ac2-6b7a-48e8-91b5-c477f9204bb3",
  "password": "keBu2njHCFdt"
},
{
  "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
  "username": "705c3286-925e-43ba-ab27-75f55d1d950d",
  "password": "clDwedPZsY5S"
},
{
  "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
  "username": "23151269-241e-418e-aae5-1da59e4ef05d",
  "password": "TukT7mFsqIle"
},
{
  "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
  "username": "cce8d209-3141-4325-a71a-ce04067c6456",
  "password": "6SMgoMGfknJG"
},
{
  "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
  "username": "6125385d-4c52-4e9f-82d6-6fe1eb83e942",
  "password": "MF1zuI3b24uv"
},
{
  "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
  "username": "f2b9928e-cccd-49c4-aef1-e22677650204",
  "password": "TIqGk5b58AMG"
}
                ]

cred_count = 0
with open('business_ids.txt','r') as f:
    business_ids = f.readlines()

natural_language_understanding = NaturalLanguageUnderstandingV1(
    version='2017-02-27',
    username=watson_creds[cred_count]["username"],
    password=watson_creds[cred_count]["password"])

for business_id in business_ids:
    business_id = business_id.split(',')
    business_id = business_id[0].strip('"')
    print business_id
    # business_id = "Rr233WRnykn1j-qU9KOzCg"
    fields = {'_id': False,'review_id': True,'text':True,'date':True,'stars': True}
    # query = {'business_id': business_id,"date": {"$gte": '2016-03',"$lt": '2016-04'}}
    query = {'business_id': business_id,"pos_keywords": {"$exists": False}}
    # print query
    db_results = collection.find(query, projection=fields)
    json_projects = []

    count = 0


    # print db_results
    for db_result in db_results:
        # print db_result
        review = db_result["text"]
        pos_keywords = []
        neg_keywords = []
        try:
            response = natural_language_understanding.analyze(
                text=review,
                features=[features.Keywords()])

            temp_keywords = []

            for word in response["keywords"]:
                if word['relevance'] > 0.5:
                    temp_keywords += [word['text']]
                    # if word['text'] not in keywords:
                    #     keywords[word['text']] = 1
                    # else:
                    #     keywords[word['text']] += 1

            # print temp_keywords

            response2 = natural_language_understanding.analyze(
                text=review,
                features=[features.Sentiment(targets=temp_keywords)])
            # print(json.dumps(response2, indent=2))
            for target in response2["sentiment"]["targets"]:
                if target["label"] == u'negative':
                    keywords = neg_keywords
                else:
                    keywords = pos_keywords
                keywords += [target["text"]]
                # if target["text"] not in keywords:
                #     keywords[target["text"]] = 1
                #     # print keywords
                # else:
                #     # print keywords[target["text"]]
                #     keywords[target["text"]] += 1

            collection.update({'review_id': db_result['review_id']}, {"$set": {"pos_keywords":pos_keywords,"neg_keywords":neg_keywords}}, upsert=False)
            count += 1
            if count % 100 == 0:
                print count,len(pos_keywords),len(neg_keywords)
        except WatsonException as err:
            traceback.print_exc()
            print str(err).split(',')[1].strip()
            if str(err).split(',')[1].strip() == "Code: 403":
                if cred_count == len(watson_creds):
                    exit()
                else:
                    cred_count += 1
                    natural_language_understanding = NaturalLanguageUnderstandingV1(
                        version='2017-02-27',
                        username=watson_creds[cred_count]["username"],
                        password=watson_creds[cred_count]["password"])



