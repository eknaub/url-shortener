import {
  Box,
  Paper,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddUrlDialog from "../components/AdminPage/AddUrlDialog";
import Container from "@mui/material/Container";
import DeleteUrlDialog from "../components/AdminPage/DeleteUrlDialog";
import EditUrlDialog from "../components/AdminPage/EditUrlDialog";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useUrlStore } from "../stores/useUrlStore";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AdminPage() {
  const fetchUrls = useUrlStore((state) => state.fetchUrls);
  const addUrl = useUrlStore((state) => state.addUrl);
  const editUrl = useUrlStore((state) => state.editUrl);
  const deleteUrl = useUrlStore((state) => state.deleteUrl);
  const urls = useUrlStore((state) => state.urls);
  const lastModifiedUrl = useUrlStore((state) => state.lastModifiedUrl);
  const { t } = useTranslation();

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Container>
                  <AddUrlDialog handleClick={addUrl} />
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
                    <EditUrlDialog url={elem} handleClick={editUrl} />
                    <DeleteUrlDialog
                      id={elem.id}
                      handleClick={() => deleteUrl(elem.id)}
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
