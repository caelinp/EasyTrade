import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

admin.initializeApp();
const NUM_LEADS_INITIAL = 5;

interface JobSchema {
  address: string;
  city: string;
  country: string;
  description: string;
  duration: string;
  budget: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  postalCode: string;
  provinceState: string;
  skills: string[];
  title: string;
  timestamp: string;
  numLeadsTotal: string;
  numLeadsPurchased: string;
}

const jobSchema: JobSchema = {
  address: "",
  city: "",
  country: "",
  description: "",
  duration: "",
  budget: "",
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  postalCode: "",
  provinceState: "",
  skills: [],
  title: "",
  timestamp: "",
  numLeadsTotal: "",
  numLeadsPurchased: ""
};

// Job summary interface excludes properties that will be available if leads are purchased
interface JobSummarySchema {
  city: string;
  country: string;
  description: string;
  duration: string;
  budget: string;
  firstName: string;
  provinceState: string;
  skills: string[];
  title: string;
  timestamp: string;
  numLeadsTotal: string;
  numLeadsPurchased: string;
}

const app = express();
app.use(cors({ origin: true }));

app.post("/addJob", async (req, res) => {
  const jobData: JobSchema = { ...jobSchema };
  for (const key in jobSchema) {
    if (Object.prototype.hasOwnProperty.call(jobSchema, key)) {
      const keyTyped = key as keyof JobSchema;
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        jobData[keyTyped] = req.body[key];
      }
    }
  }

  const now = new Date();
  jobData.timestamp = now.toISOString();
  jobData.numLeadsTotal = (NUM_LEADS_INITIAL).toString();
  jobData.numLeadsPurchased = "0";

  try {
    const writeResult = await admin.firestore().collection("jobs").add(jobData);
    functions.logger.log(`Job with ID: ${writeResult.id} added.`);
    res.status(200).send({ result: `Job with ID: ${writeResult.id} added.` });
  } catch (error) {
    functions.logger.error("Failed to add job", error);
    res.status(500).send({ error: "Failed to add job" });
  }
});

app.get("/getJobs", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const startAfter = req.query.startAfter as string;

    // Filter parameters
    const keywords = req.query.keywords as string;
    const city = req.query.city as string;
    const skills = req.query.skills as string[]
    const minDuration = parseInt(req.query.minDuration as string);
    const maxDuration = parseInt(req.query.maxDuration as string);
    const daysSincePosted = parseInt(req.query.daysSincePosted as string);

    let query = admin.firestore().collection("jobs").orderBy("timestamp");

    // Apply filters
    if (keywords) {
      query = query.where('title', 'array-contains-any', keywords.split(' '))
        .where('description', 'array-contains-any', keywords.split(' '));
    }
    if (city) {
      query = query.where('city', '==', city);
    }
    if (skills) {
      skills.forEach(skill => {
        query = query.where('skills', 'array-contains', skill.trim());
      });
    }
    if (!isNaN(minDuration) && !isNaN(maxDuration)) {
      query = query.where('duration', '>=', minDuration)
        .where('duration', '<=', maxDuration);
    }
    if (!isNaN(daysSincePosted)) {
      const dateLimit = admin.firestore.Timestamp.fromDate(new Date(Date.now() - daysSincePosted * 24 * 60 * 60 * 1000));
      query = query.where('timestamp', '>=', dateLimit);
    }

    if (startAfter) {
      const lastDoc = await admin.firestore().collection("jobs").doc(startAfter).get();
      if (!lastDoc.exists) {
        res.status(404).send({ error: "Invalid 'startAfter' document ID" });
        return;
      }
      query = query.startAfter(lastDoc);
    }

    query = query.limit(limit);
    const jobsSnapshot = await query.get();
    const jobs = jobsSnapshot.docs.map(doc => {
      const jobData = doc.data() as JobSchema;
      const jobSummary: JobSummarySchema = {
        city: jobData.city,
        country: jobData.country,
        description: jobData.description,
        duration: jobData.duration,
        budget: jobData.budget,
        firstName: jobData.firstName,
        provinceState: jobData.provinceState,
        skills: jobData.skills,
        title: jobData.title,
        timestamp: jobData.timestamp,
        numLeadsTotal: jobData.numLeadsTotal,
        numLeadsPurchased: jobData.numLeadsPurchased
      };
      return { id: doc.id, ...jobSummary };
    });

    if (jobs.length === 0) {
      res.status(404).send({ error: "No jobs found" });
      return;
    }

    const lastVisible = jobsSnapshot.docs[jobsSnapshot.docs.length - 1];
    res.status(200).send({
      jobs,
      nextPageToken: lastVisible ? lastVisible.id : null
    });
  } catch (error) {
    functions.logger.error("Error getting jobs", error);
    res.status(500).send({ error: "Error getting jobs" });
  }
});

export const api = functions.https.onRequest(app);
