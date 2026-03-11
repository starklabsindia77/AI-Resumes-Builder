"use client";
import React from "react";
import { useParams } from "next/navigation";
import useGetDocument from "@/features/document/use-get-document-by-id";
import { ResumeDataType } from "@/types/resume.type";
import Error from "../../../_components/Error";
import { DynamicPortfolio } from "@/components/portfolio-templates/DynamicPortfolio";
import {
  portfolioTemplates,
  PortfolioTemplateConfig,
} from "@/lib/portfolio-templates-config";

const DEFAULT_PORTFOLIO_TEMPLATE = "free-modern";

const PublicPortfolio = () => {
  const param = useParams();
  const documentId = param.documentId as string;
  const { data, isSuccess, isLoading } = useGetDocument(documentId, true);
  const resumeInfo = data?.data ?? ({} as ResumeDataType);

  if (!isLoading && !isSuccess) {
    return <Error />;
  }

  const portfolioTemplateId =
    resumeInfo?.portfolioTemplate || DEFAULT_PORTFOLIO_TEMPLATE;
  const config: PortfolioTemplateConfig =
    portfolioTemplates.find((t) => t.id === portfolioTemplateId) ||
    portfolioTemplates[0];

  return (
    <DynamicPortfolio resumeInfo={resumeInfo} config={config} />
  );
};

export default PublicPortfolio;
