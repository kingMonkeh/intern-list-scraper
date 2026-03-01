import requests
import json

# The endpoint URL
url = "https://jobright.ai/swan/mini-sites/list?position=0&count=50"

# Your data payload
payload = {
    "category": "intern:us:swe",
    "company": [
        "Anthropic", "OpenAI", "Hudson River Trading", "Jane Street", "Deepmind", 
        "Citadel", "Nvidia", "Netflix", "Google", "Meta", "Radix Trading", 
        "Two Sigma", "Optiver", "Databricks", "Apple", "Stripe", "Jump Trading", 
        "Renaissance Technologies", "Five Rings", "Roblox", "xAI", "SpaceX", 
        "Waymo", "IMC Trading", "D.E. Shaw", "Airbnb", "Uber", "Cursor", 
        "Microsoft", "Palantir", "Snowflake", "Coinbase", "Akuna Capital", 
        "DoorDash", "Ramp", "Figma", "LinkedIn", "Tesla", "Pinterest", 
        "Scale AI", "Datadog", "Square", "Hugging Face", "Notion", "Anduril", 
        "GitHub", "Amazon", "Bloomberg", "Robinhood", "Discord", "Lyft", 
        "Reddit", "NASA", "Neuralink", "Spotify", "Snap", "ByteDance", "X", 
        "Duolingo", "Bytedance", "Blue Origin", "Salesforce", "Plaid", 
        "MongoDB", "Twitch", "Slack", "Arista Networks", "Flow Traders", 
        "Dropbox", "Blackrock", "Cloudflare", "Adobe", "Riot Games", 
        "Goldman Sachs", "Atlassian", "Shopify", "PayPal", "Voleon", 
        "Cohere", "Oracle", "Brex", "Capital One", "Rippling", "JPMC", 
        "Nuro", "Canva", "Instacart", "Airtable", "Zoom", "Asana", 
        "Morgan Stanley", "Okta", "Autodesk", "IBM", "Splunk", "Intuit", 
        "Palo Alto Networks", "Intel", "Twilio", "Cruise", "Disney", 
        "Cisco", "HubSpot", "Red Hat", "Quora", "Lockheed Martin", "Ebay", 
        "Glean", "Hulu", "ServiceNow", "Samsung", "Zillow", "GrubHub", "Box", 
        "Affirm", "Docusign", "Expedia", "Samsara", "Etsy", "VMware", 
        "Walmart", "Indeed", "Tableau", "Workday", "Qualtrics", "Postmates", 
        "Yelp", "Verily", "Nutanix", "Carvana", "Bolt", "Elastic", "Nextdoor", 
        "Redfin", "Flexport", "Peloton", "Addepar", "Wish", "Tanium", 
        "Kayak", "Yext", "Retool"
    ]
}

# Headers - sometimes APIs require a User-Agent or Content-Type to work
headers = {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0"
}

# Sending the POST request
# Using json=payload automatically handles double quotes and content-type
response = requests.post(url, json=payload, headers=headers)

# Checking the result
if response.status_code == 200:
    print("Success!")
    response = response.json()
    # print(response['result']['jobList'])
    for r in response['result']['jobList']:
        print(f"{r['properties']['company']}")
    
else:
    print(f"Failed with status code: {response.status_code}")
    print(response.text)
