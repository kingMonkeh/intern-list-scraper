import { useState, useEffect } from 'react'
import './App.css'
import JobPosting from './components/posting';
import { Analytics } from "@vercel/analytics/react"


const target_companies = [
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
];

function App() {
  const [us_jobs, setUSJobs] = useState([])
  const [canada_jobs, setCanadaJobs] = useState([])
  const [displayCanada, setDisplayCanada] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const url = "/api/swan/mini-sites/list?position=0&count=500";      
      const payload = {
        category: "intern:us:swe",
        company: target_companies
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        const canada_payload = {
        category: "intern:ca:swe",
        company: target_companies
      };
        const canada_response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(canada_payload)
        });

        const canada_data = await canada_response.json();
        setCanadaJobs(canada_data.result?.jobList || [])
        
        // If the API returns a list, we store it in state
        // Assuming the response structure has a list under a key like 'items'
        setUSJobs(data.result?.jobList || []); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(us_jobs[0])

  const currentJobs = displayCanada ? canada_jobs : us_jobs;
  
  return (
    <>
    <div className="flex-col flex gap-4">
      <Analytics></Analytics>
      <button onClick = {() => {setDisplayCanada(!displayCanada)}}>Show {displayCanada ? "US" : "Canada"}</button>
      {currentJobs
        .filter((job) => target_companies.includes(job.properties.company))
        .filter((job) => !(job.properties.title).includes("PhD"))
        .map((job) => (
          <JobPosting  
            title={job.properties.title}
            company={job.properties.company}
            date={job.postedAt}
            id={job.jobId}
          />
      ))
      }
    </div>
    </>
  )
}

export default App
