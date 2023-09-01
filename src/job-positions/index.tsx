import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../api/useApi";
import { JOBS_URL } from "../api/urls";
import { JobPosition, JobsResponse } from "../types";
import { Location } from "../components/location";

export const JobPositions = () => {
  const { isLoading, data, error } = useApi<JobsResponse>(JOBS_URL);
  const { jobs: jobPositions, meta } = data || {};

  // keep separate from jobPositions so we can filter without losing the original value
  const [filteredJobPositions, setFilteredJobPositions] =
    useState(jobPositions);
  const [filterString, setFilterString] = useState("");

  useEffect(() => {
    // handled without a server call, otherwise would've debounced
    if (!jobPositions || jobPositions.length === 0) return;
    setFilteredJobPositions(
      filterString
        ? jobPositions?.filter((jobPosition: JobPosition) =>
            jobPosition?.title
              ?.toLowerCase()
              .includes(filterString.toLowerCase())
          )
        : jobPositions
    );
  }, [filterString, jobPositions]);

  if (error) {
    return <Typography variant="h1">{error.message}</Typography>;
  }

  function handleFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilterString(event.target.value);
  }

  return (
    <Container>
      <Typography variant="h1">Job Positions</Typography>
      <TextField
        id="outlined-basic"
        label="Filter by Job Title"
        variant="outlined"
        onChange={handleFilterChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <Typography variant="h6">
        {filteredJobPositions?.length} positions found
      </Typography>
      <List>
        {!isLoading &&
          filteredJobPositions?.map((jobPosition: JobPosition) => (
            <React.Fragment key={jobPosition.id}>
              <ListItem key={jobPosition.id} disablePadding>
                <ListItemButton component={Link} to={`/jobs/${jobPosition.id}`}>
                  <ListItemText
                    primary={jobPosition.title}
                    secondary={
                      <Location location={jobPosition.location.name} />
                    }
                  />
                </ListItemButton>
              </ListItem>

              <Divider component="li" />
            </React.Fragment>
          ))}
      </List>
    </Container>
  );
};
