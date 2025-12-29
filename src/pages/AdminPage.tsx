import {
  Box,
  Paper,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
} from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import AddUrlDialog from "../components/AdminPage/AddUrlDialog";
import Container from "@mui/material/Container";
import DeleteUrlDialog from "../components/AdminPage/DeleteUrlDialog";
import EditUrlDialog from "../components/AdminPage/EditUrlDialog";
import { useTranslation } from "react-i18next";
import {
  LastModifiedUrlContext,
  type LastModifiedUrlContextType,
} from "../context/LastModifiedUrlContext";
import type { IUrl } from "../models/IUrl";

export default function AdminPage() {
  const [urls, setUrls] = React.useState<IUrl[]>([]);
  const { lastModifiedUrl, setLastModifiedUrl } = React.useContext(
    LastModifiedUrlContext
  ) as LastModifiedUrlContextType;
  const [warningMessage, setWarningMessage] = React.useState<string>("");
  const [openWarningSnackbar, setOpenWarningSnackbar] =
    React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [openErrorSnackbar, setOpenErrorSnackbar] =
    React.useState<boolean>(false);
  const user: string =
    import.meta.env.VITE_USER_NAME + ":" + import.meta.env.VITE_PASSWORD;

  const { t } = useTranslation();

  React.useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch("https://urlshortener.smef.io/urls", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;",
        Authorization: `Basic ${btoa(user)}`,
      },
    })
      .then((response) => {
        if (
          response.status !== 200 &&
          response.status !== 400 &&
          response.status !== 500
        ) {
          throw Error("Something went wrong ...");
        }

        return response.json();
      })
      .then((data) => {
        if (data.status) {
          if (data.invalidParams) {
            setWarningMessage(
              data.title +
                ": " +
                data.invalidParams[0].name +
                " " +
                data.invalidParams[0].reason
            );
          } else {
            setWarningMessage(data.title + ": " + data.detail);
          }
          setOpenWarningSnackbar(true);
        } else {
          setUrls(data);
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setOpenErrorSnackbar(true);
      });
  };

  const handleEditUrl = (id: string, url: string, ttl: number) => {
    var jsonData = {
      url: url,
      ttlInSeconds: ttl,
    };

    fetch(`https://urlshortener.smef.io/urls/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;",
        Authorization: `Basic ${btoa(user)}`,
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (
          response.status !== 200 &&
          response.status !== 400 &&
          response.status !== 404 &&
          response.status !== 500
        ) {
          throw Error("Something went wrong ...");
        }

        return response.json();
      })
      .then((data) => {
        if (data.status) {
          if (data.invalidParams) {
            setWarningMessage(
              data.title +
                ": " +
                data.invalidParams[0].name +
                " " +
                data.invalidParams[0].reason
            );
          } else {
            setWarningMessage(data.title + ": " + data.detail);
          }
          setOpenWarningSnackbar(true);
        } else {
          const newList = urls.map((item) => {
            if (item.id === data.id) {
              const updatedItem = {
                ...item,
                url: url,
                ttlInSeconds: ttl,
                modifiedDate: new Date().toISOString(),
              };
              setLastModifiedUrl(updatedItem);
              return updatedItem;
            }
            return item;
          });

          setUrls(newList);
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setOpenErrorSnackbar(true);
      });
  };

  const handleDeleteUrl = (id: string) => {
    fetch(`https://urlshortener.smef.io/urls/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;",
        Authorization: `Basic ${btoa(user)}`,
      },
    })
      .then((response) => {
        if (response.status === 204) {
          const newList = urls.filter((item) => item.id !== id);
          setUrls(newList);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data && data.status) {
          if (data.invalidParams) {
            setWarningMessage(
              data.title +
                ": " +
                data.invalidParams[0].name +
                " " +
                data.invalidParams[0].reason
            );
          } else {
            setWarningMessage(data.title + ": " + data.detail);
          }
          setOpenWarningSnackbar(true);
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setOpenErrorSnackbar(true);
      });
  };

  const handleAddUrl = (id: string, url: string, ttl: number | null) => {
    var jsonData = {
      url: url,
      ttlInSeconds: ttl,
    };

    fetch(`https://urlshortener.smef.io/urls/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;",
        Authorization: `Basic ${btoa(user)}`,
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (
          response.status !== 200 &&
          response.status !== 400 &&
          response.status !== 409 &&
          response.status !== 500
        ) {
          throw Error("Something went wrong ...");
        }

        return response.json();
      })
      .then((data) => {
        if (data.status) {
          if (data.invalidParams) {
            setWarningMessage(
              data.title +
                ": " +
                data.invalidParams[0].name +
                " " +
                data.invalidParams[0].reason
            );
          } else {
            setWarningMessage(data.title + ": " + data.detail);
          }
          setOpenWarningSnackbar(true);
        } else {
          setUrls([...urls, data]);
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setOpenErrorSnackbar(true);
      });
  };

  const handleErrorSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorSnackbar(false);
  };

  const handleWarningSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenWarningSnackbar(false);
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div>
      {warningMessage && (
        <Snackbar
          open={openWarningSnackbar}
          autoHideDuration={3000}
          onClose={handleWarningSnackbarClose}
        >
          <Alert severity="warning" onClose={handleWarningSnackbarClose}>
            {warningMessage}
          </Alert>
        </Snackbar>
      )}
      {errorMessage && (
        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={3000}
          onClose={handleErrorSnackbarClose}
        >
          <Alert severity="error" onClose={handleErrorSnackbarClose}>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Container>
                  <AddUrlDialog handleClick={handleAddUrl} />
                </Container>
              </TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">URL</TableCell>
              <TableCell align="right">TTL</TableCell>
              <TableCell align="right">
                {t("adminPageTableTitleCreatedDate")}
              </TableCell>
              <TableCell align="right">
                {t("adminPageTableTitleModifiedDate")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((elem) => (
              <StyledTableRow
                key={elem.id}
                style={
                  elem.id === lastModifiedUrl.id
                    ? { backgroundColor: "#e1ffd7" }
                    : {}
                }
              >
                <TableCell component="th" scope="row">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <EditUrlDialog
                      pId={elem.id}
                      pUrl={elem.url}
                      pTtl={elem.ttlInSeconds}
                      handleClick={handleEditUrl}
                    />
                    <DeleteUrlDialog
                      id={elem.id}
                      handleClick={() => handleDeleteUrl(elem.id)}
                    />
                  </Box>
                </TableCell>
                <TableCell align="right">{elem.id}</TableCell>
                <TableCell align="right">{elem.url}</TableCell>
                <TableCell align="right">{elem.ttlInSeconds}</TableCell>
                <TableCell align="right">{elem.createdDate}</TableCell>
                <TableCell align="right">{elem.modifiedDate}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
