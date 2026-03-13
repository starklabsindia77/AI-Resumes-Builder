import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { and, desc, eq, ne } from "drizzle-orm";
import { z } from "zod";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import {
  createDocumentTableSchema,
  DocumentSchema,
  documentTable,
  updateCombinedSchema,
  UpdateDocumentSchema,
} from "@/db/schema/document";
import { getAuthUser } from "@/lib/kinde";
import { generateDocUUID } from "@/lib/helper";
import { db } from "@/db";
import {
  educationTable,
  experienceTable,
  personalInfoTable,
  skillsTable,
} from "@/db/schema";
import { canCreateResume } from "@/lib/entitlements";

const documentRoute = new Hono()
  .post(
    "/create",
    zValidator("json", createDocumentTableSchema),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user");
        const { title } = c.req.valid("json") as DocumentSchema;
        const userId = user.id;

        const canCreate = await canCreateResume(userId);
        if (!canCreate) {
          return c.json(
            {
              success: false,
              message: "You have reached the limit of 1 resume for the Starter plan. Please upgrade to create more.",
            },
            403
          );
        }

        const authorName = `${user.given_name} ${user?.family_name}`;
        const authorEmail = user.email as string;
        const documentId = generateDocUUID();

        const newDoc = {
          title: title,
          userId: userId,
          documentId: documentId,
          authorName: authorName,
          authorEmail: authorEmail,
        };

        const [data] = await db
          .insert(documentTable)
          .values(newDoc)
          .returning();
        return c.json(
          {
            success: "ok",
            data,
          },
          { status: 200 }
        );
      } catch (error) {
        return c.json(
          {
            success: false,
            message: "Failed to create document",
            error: error,
          },
          500
        );
      }
    }
  )
  .patch(
    "/update/:documentId",
    zValidator(
      "param",
      z.object({
        documentId: z.string(),
      })
    ),
    zValidator("json", updateCombinedSchema),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user");
        const { documentId } = c.req.valid("param");

        const {
          title,
          status,
          summary,
          thumbnail,
          themeColor,
          currentPosition,
          personalInfo,
          experience,
          education,
          skills,
        } = c.req.valid("json");
        const userId = user.id;

        if (!documentId) {
          return c.json({ error: "DocumentId is required" }, 400);
        }

        const [existingDocument] = await db
          .select()
          .from(documentTable)
          .where(
            and(
              eq(documentTable.documentId, documentId),
              eq(documentTable.userId, userId)
            )
          );

        if (!existingDocument) {
          return c.json({ error: "Document not found" }, 404);
        }

        const resumeUpdate = {} as UpdateDocumentSchema;
        if (title) resumeUpdate.title = title;
        if (thumbnail) resumeUpdate.thumbnail = thumbnail;
        if (summary) resumeUpdate.summary = summary;
        if (themeColor) resumeUpdate.themeColor = themeColor;
        if (status) resumeUpdate.status = status;
        if (currentPosition)
          resumeUpdate.currentPosition = currentPosition || 1;

        if (Object.keys(resumeUpdate)?.length > 0) {
          await db
            .update(documentTable)
            .set(resumeUpdate)
            .where(
              and(
                eq(documentTable.documentId, documentId),
                eq(documentTable.userId, userId)
              )
            )
            .returning();
        }

        if (personalInfo) {
          if (personalInfo?.firstName || personalInfo?.lastName) {
            const exists = await db
              .select()
              .from(personalInfoTable)
              .where(eq(personalInfoTable.docId, existingDocument.id))
              .limit(1);

            if (exists.length > 0) {
              await db
                .update(personalInfoTable)
                .set(personalInfo)
                .where(eq(personalInfoTable.docId, existingDocument.id));
            } else {
              await db.insert(personalInfoTable).values({
                docId: existingDocument.id,
                ...personalInfo,
              });
            }
          }
        }

        if (experience && Array.isArray(experience)) {
          const existingExperience = await db
            .select()
            .from(experienceTable)
            .where(eq(experienceTable.docId, existingDocument.id));

          const existingExperienceMap = new Set(
            existingExperience.map((exp) => exp.id)
          );

          for (const exp of experience) {
            const { id, ...data } = exp;
            if (id !== undefined && existingExperienceMap.has(id)) {
              await db
                .update(experienceTable)
                .set(data)
                .where(
                  and(
                    eq(experienceTable.docId, existingDocument.id),
                    eq(experienceTable.id, id)
                  )
                );
            } else {
              await db.insert(experienceTable).values({
                docId: existingDocument.id,
                ...data,
              });
            }
          }
        }

        if (education && Array.isArray(education)) {
          const existingEducation = await db
            .select()
            .from(educationTable)
            .where(eq(educationTable.docId, existingDocument.id));

          const existingEducationMap = new Set(
            existingEducation.map((edu) => edu.id)
          );

          for (const edu of education) {
            const { id, ...data } = edu;
            if (id !== undefined && existingEducationMap.has(id)) {
              await db
                .update(educationTable)
                .set(data)
                .where(
                  and(
                    eq(educationTable.docId, existingDocument.id),
                    eq(educationTable.id, id)
                  )
                );
            } else {
              await db.insert(educationTable).values({
                docId: existingDocument.id,
                ...data,
              });
            }
          }
        }

        if (skills && Array.isArray(skills)) {
          const existingskills = await db
            .select()
            .from(skillsTable)
            .where(eq(skillsTable.docId, existingDocument.id));

          const existingSkillsMap = new Set(
            existingskills.map((skill) => skill.id)
          );

          for (const skill of skills) {
            const { id, ...data } = skill;
            if (id !== undefined && existingSkillsMap.has(id)) {
              await db
                .update(skillsTable)
                .set(data)
                .where(
                  and(
                    eq(skillsTable.docId, existingDocument.id),
                    eq(skillsTable.id, id)
                  )
                );
            } else {
              await db.insert(skillsTable).values({
                docId: existingDocument.id,
                ...data,
              });
            }
          }
        }

        return c.json(
          {
            success: "ok",
            message: "Updated successfully",
          },
          { status: 200 }
        );
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to update document",
          error: error,
        },
        500
      );
    }
    }
  )
  .patch(
    "/retore/archive",
    zValidator(
      "json",
      z.object({
        documentId: z.string(),
        status: z.string(),
      })
    ),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user");
        const userId = user.id;

        const { documentId, status } = c.req.valid("json");

        if (!documentId) {
          return c.json({ message: "DocumentId must provided" }, 400);
        }

        if (status !== "archived") {
          return c.json(
            { message: "Status must be archived before restore" },
            400
          );
        }

        const [documentData] = await db
          .update(documentTable)
          .set({
            status: "private",
          })
          .where(
            and(
              eq(documentTable.userId, userId),
              eq(documentTable.documentId, documentId),
              eq(documentTable.status, "archived")
            )
          )
          .returning();

        if (!documentData) {
          return c.json({ message: "Document not found" }, 404);
        }

        return c.json(
          {
            success: "ok",
            message: "Updated successfully",
            data: documentData,
          },
          { status: 200 }
        );
      } catch (error) {
        return c.json(
          {
            success: false,
            message: "Failed to retore document",
            error: error,
          },
          500
        );
      }
    }
  )
  .get("all", getAuthUser, async (c) => {
    try {
      const user = c.get("user");
      const userId = user.id;
      const documents = await db
        .select()
        .from(documentTable)
        .orderBy(desc(documentTable.updatedAt))
        .where(
          and(
            eq(documentTable.userId, userId),
            ne(documentTable.status, "archived")
          )
        );
      return c.json({
        success: true,
        data: documents,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to fetch documents",
          error: error,
        },
        500
      );
    }
  })
  .get(
    "/:documentId",
    zValidator(
      "param",
      z.object({
        documentId: z.string(),
      })
    ),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user");
        const { documentId } = c.req.valid("param");

        const userId = user?.id;
        const documentData = await db.query.documentTable.findFirst({
          where: and(
            eq(documentTable.userId, userId),
            eq(documentTable.documentId, documentId)
          ),
          with: {
            personalInfo: true,
            experiences: true,
            educations: true,
            skills: true,
          },
        });
        return c.json({
          success: true,
          data: documentData,
        });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to fetch document",
          error: error,
        },
        500
      );
    }
    }
  )
  .get(
    "public/doc/:documentId",
    zValidator(
      "param",
      z.object({
        documentId: z.string(),
      })
    ),
    async (c) => {
      try {
        const { documentId } = c.req.valid("param");
        const documentData = await db.query.documentTable.findFirst({
          where: and(
            eq(documentTable.status, "public"),
            eq(documentTable.documentId, documentId)
          ),
          with: {
            personalInfo: true,
            experiences: true,
            educations: true,
            skills: true,
          },
        });

        if (!documentData) {
          return c.json(
            {
              error: true,
              message: "unauthorized",
            },
            401
          );
        }
        return c.json({
          success: true,
          data: documentData,
        });
      } catch (error) {
        return c.json(
          {
            success: false,
            message: "Failed to fetch document",
            error: error,
          },
          500
        );
      }
    }
  )
  .get("/trash/all", getAuthUser, async (c) => {
    try {
      const user = c.get("user");
      const userId = user.id;
      const documents = await db
        .select()
        .from(documentTable)
        .where(
          and(
            eq(documentTable.userId, userId),
            eq(documentTable.status, "archived")
          )
        );
      return c.json({
        success: true,
        data: documents,
      });
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Failed to fetch documents",
          error: error,
        },
        500
      );
    }
  })
  .post(
    "/duplicate/:documentId",
    zValidator(
      "param",
      z.object({
        documentId: z.string(),
      })
    ),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user");
        const { documentId } = c.req.valid("param");
        const userId = user.id;

        // 1. Get original document
        const originalDoc = await db.query.documentTable.findFirst({
          where: and(
            eq(documentTable.userId, userId),
            eq(documentTable.documentId, documentId)
          ),
          with: {
            personalInfo: true,
            experiences: true,
            educations: true,
            skills: true,
          },
        });

        if (!originalDoc) {
          throw new Error("Original document not found");
        }

        // 2. Create new document
        const newDocumentId = generateDocUUID();
        const [newDoc] = await db
          .insert(documentTable)
          .values({
            title: `${originalDoc.title} (Shadow)`,
            userId: userId,
            documentId: newDocumentId,
            authorName: originalDoc.authorName,
            authorEmail: originalDoc.authorEmail,
            summary: originalDoc.summary,
            thumbnail: originalDoc.thumbnail,
            themeColor: originalDoc.themeColor,
            status: "private",
          })
          .returning();

        // 3. Duplicate relations
        if (originalDoc.personalInfo) {
          const { id, docId, ...piData } = originalDoc.personalInfo;
          await db.insert(personalInfoTable).values({
            ...piData,
            docId: newDoc.id,
          });
        }

        if (originalDoc.experiences?.length > 0) {
          for (const exp of originalDoc.experiences) {
            const { id, docId, ...expData } = exp;
            await db.insert(experienceTable).values({
              ...expData,
              docId: newDoc.id,
            });
          }
        }

        if (originalDoc.educations?.length > 0) {
          for (const edu of originalDoc.educations) {
            const { id, docId, ...eduData } = edu;
            await db.insert(educationTable).values({
              ...eduData,
              docId: newDoc.id,
            });
          }
        }

        if (originalDoc.skills?.length > 0) {
          for (const skill of originalDoc.skills) {
            const { id, docId, ...skillData } = skill;
            await db.insert(skillsTable).values({
              ...skillData,
              docId: newDoc.id,
            });
          }
        }

        const result = newDoc;

        return c.json({
          success: true,
          data: result,
        });
      } catch (error) {
        return c.json(
          {
            success: false,
            message: "Failed to duplicate document",
            error: error instanceof Error ? error.message : "Unknown error",
          },
          500
        );
      }
    }
  )
  .delete(
    "/:documentId",
    zValidator(
      "param",
      z.object({
        documentId: z.string(),
      })
    ),
    getAuthUser,
    async (c) => {
      try {
        const user = c.get("user");
        const { documentId } = c.req.valid("param");
        const userId = user.id;

        const [documentData] = await db
          .update(documentTable)
          .set({
            status: "archived",
          })
          .where(
            and(
              eq(documentTable.userId, userId),
              eq(documentTable.documentId, documentId)
            )
          )
          .returning();

        if (!documentData) {
          return c.json({ message: "Document not found or unauthorized" }, 404);
        }

        return c.json({
          success: true,
          message: "Document moved to trash",
          data: documentData,
        });
      } catch (error) {
        return c.json(
          {
            success: false,
            message: "Failed to delete document",
            error: error instanceof Error ? error.message : "Internal error",
          },
          500
        );
      }
    }
  );

export default documentRoute;
