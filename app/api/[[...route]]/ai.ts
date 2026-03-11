import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { AIChatSession } from "@/lib/google-ai-model";
import { getAuthUser } from "@/lib/kinde";

const aiRoute = new Hono()
  .post(
    "/analyze",
    zValidator(
      "json",
      z.object({
        resumeData: z.any(),
        jobDescription: z.string(),
      })
    ),
    getAuthUser,
    async (c) => {
      try {
        const { resumeData, jobDescription } = c.req.valid("json");

        const prompt = `
          As an expert ATS (Applicant Tracking System) and Career Coach, analyze the following resume data against the provided job description.
          
          Resume Data:
          ${JSON.stringify(resumeData)}
          
          Job Description:
          ${jobDescription}
          
          Please provide the analysis in the following strict JSON format:
          {
            "score": number (0-100),
            "summary": "2-3 sentences summarizing the match",
            "missingKeywords": ["keyword1", "keyword2", ...],
            "improvementTips": ["tip1", "tip2", ...],
            "impactStatements": ["improved bullet point 1", "improved bullet point 2", ...]
          }
          
          Focus on keyword matching, role relevance, and quantifying achievements. If the job description is empty, provide a general professional score based on resume best practices.
        `;

        const result = await AIChatSession.sendMessage(prompt);
        const responseText = result.response.text();
        
        // Clean up potential markdown formatting from AI response
        const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        const analysis = JSON.parse(cleanJson);

        return c.json({
          success: true,
          data: analysis,
        });
      } catch (error) {
        console.error("AI Analysis Error:", error);
        return c.json(
          {
            success: false,
            message: "Failed to perform AI analysis",
            error: error instanceof Error ? error.message : "Unknown error",
          },
          500
        );
      }
    }
  )
  .post(
    "/suggest",
    zValidator(
      "json",
      z.object({
        type: z.enum(["summary", "experience"]),
        context: z.string(),
      })
    ),
    getAuthUser,
    async (c) => {
      try {
        const { type, context } = c.req.valid("json");

        const prompt = `
          As an expert resume writer, generate 3 professional ${type === "summary" ? "career summaries" : "work experience bullet points"} for the following role/context:
          "${context}"
          
          Provide the response in the following strict JSON format:
          {
            "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
          }
          
          Ensure the tone is professional, achievement-oriented, and includes industry-standard keywords.
        `;

        const result = await AIChatSession.sendMessage(prompt);
        const responseText = result.response.text();
        const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        const { suggestions } = JSON.parse(cleanJson);

        return c.json({
          success: true,
          data: suggestions,
        });
      } catch (error) {
        console.error("AI Suggestion Error:", error);
        return c.json(
          {
            success: false,
            message: "Failed to generate AI suggestions",
            error: error instanceof Error ? error.message : "Unknown error",
          },
          500
        );
      }
    }
  )
  .post(
    "/parse-linkedin",
    zValidator(
      "json",
      z.object({
        text: z.string(),
      })
    ),
    getAuthUser,
    async (c) => {
      try {
        const { text } = c.req.valid("json");

        const prompt = `
          As an expert resume parser, extract information from the following LinkedIn profile text and format it into a valid JSON object matching this schema:
          
          {
            "personalInfo": {
              "firstName": "string",
              "lastName": "string",
              "jobTitle": "string",
              "email": "string",
              "phone": "string",
              "address": "string"
            },
            "summary": "string",
            "experiences": [
              {
                "title": "string",
                "companyName": "string",
                "city": "string",
                "state": "string",
                "startDate": "YYYY-MM-DD",
                "endDate": "YYYY-MM-DD",
                "currentlyWorking": boolean,
                "workSummary": "HTML string bullet points"
              }
            ],
            "educations": [
              {
                "universityName": "string",
                "degree": "string",
                "major": "string",
                "startDate": "YYYY-MM-DD",
                "endDate": "YYYY-MM-DD",
                "description": "string"
              }
            ],
            "skills": [
              { "name": "string", "rating": number (1-100) }
            ]
          }
          
          Profile Text:
          """
          ${text}
          """
          
          Important:
          1. Return ONLY the JSON object. 
          2. Ensure dates are in YYYY-MM-DD format if possible, or null.
          3. Format experience workSummaries as clean HTML bullet points (<ul><li>...</li></ul>).
        `;

        const result = await AIChatSession.sendMessage(prompt);
        const responseText = result.response.text();
        const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        const parsedData = JSON.parse(cleanJson);

        return c.json({
          success: true,
          data: parsedData,
        });
      } catch (error) {
        console.error("LinkedIn Parse Error:", error);
        return c.json(
          {
            success: false,
            message: "Failed to parse LinkedIn profile",
            error: error instanceof Error ? error.message : "Unknown error",
          },
          500
        );
      }
    }
  )
  .post(
    "/match",
    zValidator(
      "json",
      z.object({
        resumeData: z.any(),
        jobDescription: z.string(),
      })
    ),
    getAuthUser,
    async (c) => {
      try {
        const { resumeData, jobDescription } = c.req.valid("json");

        const prompt = `
          As an elite ATS (Applicant Tracking System) Specialist and Senior Recruiter, perform a deep-dive comparison between the provided resume and the Job Description.
          
          RESUME DATA:
          ${JSON.stringify(resumeData)}
          
          JOB DESCRIPTION:
          ${jobDescription}
          
          Instructions:
          1. Calculate a "Match Score" out of 100 based on keyword density, core skills, and experience level.
          2. Identify "Matching Keywords" that are present in both.
          3. Identify "Missing Critical Keywords" that are in the JD but not the resume.
          4. Provide 3-5 "Optimization Tips" specifically on how to rewrite sections to better align with this JD.
          5. Suggest 2 "Impactful Revisions" for existing bullet points to include missing keywords.

          Provide the response in the following strict JSON format:
          {
            "matchScore": number,
            "matchingKeywords": ["kw1", "kw2", ...],
            "missingKeywords": ["kw1", "kw2", ...],
            "improvementTips": ["tip1", "tip2", ...],
            "impactfulRevisions": [
              { "original": "text", "suggested": "text", "reason": "text" }
            ]
          }
          
          Be very critical and professional. Use industry-standard terminology.
        `;

        const result = await AIChatSession.sendMessage(prompt);
        const responseText = result.response.text();
        const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        const matchResult = JSON.parse(cleanJson);

        return c.json({
          success: true,
          data: matchResult,
        });
      } catch (error) {
        console.error("ATS Match Error:", error);
        return c.json(
          {
            success: false,
            message: "Failed to perform JD matching analysis",
            error: error instanceof Error ? error.message : "Unknown error",
          },
          500
        );
      }
    }
  );

export default aiRoute;
