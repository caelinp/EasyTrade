import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

admin.initializeApp();

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
      const jobsSnapshot = await admin.firestore().collection("jobs").get();
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
        };
        return { id: doc.id, ...jobSummary };
      });
      res.status(200).send(jobs);
    } catch (error) {
      functions.logger.error("Error getting jobs", error);
      res.status(500).send({ error: "Error getting jobs" });
    }
  });

export const api = functions.https.onRequest(app);
