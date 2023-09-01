import { useParams } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { useApi } from "../api/useApi";
import { JOBS_URL } from "../api/urls";
import { JobPositionResponse } from "../types";
import { copyToClipboard, decodeHtml } from "./util";
import { Location } from "../components/location";

export const JobDetail = () => {
  const { id } = useParams();
  const {
    data: jobPosition,
    error,
    isLoading,
  } = useApi<JobPositionResponse>(`${JOBS_URL}/${id}`);
  const [showCopiedToClipboard, setShowCopiedToClipboard] =
    React.useState<boolean>(false);

  if (error) {
    return <Typography variant="h1">{error.message}</Typography>;
  }

  const handleCopyToClipboard = () => {
    copyToClipboard(window.location.href);
    setShowCopiedToClipboard(true);
  };
  return (
    <Container>
      {!isLoading && jobPosition && (
        <React.Fragment key={jobPosition.id}>
          <Typography variant="h2">{jobPosition.title}</Typography>
          <Typography variant="h6">
            {jobPosition.departments?.[0]?.name}
          </Typography>
          <Typography variant="body1">
            <Location location={jobPosition.location.name} />
          </Typography>
          <Button variant="contained" onClick={handleCopyToClipboard}>
            Copy Link to Clipboard
          </Button>
          {showCopiedToClipboard && (
            <Typography variant="subtitle2">Copied to clipboard!</Typography>
          )}

          {jobPosition.content && (
            <span
              dangerouslySetInnerHTML={{
                __html: decodeHtml(jobPosition.content),
              }}
            />
          )}
        </React.Fragment>
      )}
    </Container>
  );
};
